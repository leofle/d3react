import React, { Component } from 'react'
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale';
import Links from './Links';
import Nodes from './Nodes';

export default class Graph extends Component {

	state = {
		width: window.innerWidth,
		height: window.innerHeight
	}
	componentWillMount() {
		window.addEventListener('resize', this.resizeCanvas);
	}

	componentDidMount() {
		let svg = d3.select("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height");

		// svg
		// .attr("preserveAspectRatio", "xMinYMin meet")
		// .attr("viewBox", "0 0 960 900");

		let color = scaleOrdinal()
			.range(['green', 'blue', 'pink', 'red', 'black', 'yellow', 'orange', 'purple', 'cyan']);


		let simulation = d3.forceSimulation()
		.force("link", d3.forceLink()
			.id(function (d) { return d.id; }))
		.force("charge", d3.forceManyBody().strength(-50))
		.force("center", d3.forceCenter(width / 2, height / 2));

		d3.json("flare.json").then(graph => {

			let nodes = graph.nodes,
				nodeById = d3.map(nodes, function (d) { return d.id; }),
				links = graph.links,
				bilinks = [];

			links.forEach(function (link) {
				let s = link.source = nodeById.get(link.source),
					t = link.target = nodeById.get(link.target),
					i = {}; // intermediate node
				nodes.push(i);
				links.push({ source: s, target: i }, { source: i, target: t });
				bilinks.push([s, i, t]);
			});


			let link = svg.select("g.links")
				.selectAll("link")
				.data(bilinks)
				.enter().append("path")
				.attr("class", "link");

			let node = svg.select("g.nodes")
				.selectAll("node")
				.data(nodes.filter(function (d) { return d.id; }))
				.enter().append("g");

			node
				.append("circle")
				.attr("class", "node")
				.attr("r", function (d) { return d.id.length })
				.attr("fill", function (d) { return color(d.group); });

			node
				.append("text")
				.attr("class", "nodetext")
				.attr("x", function (d) { return d.id.length * -2})
				.attr("y", function (d) { return d.id.length * 2 + 5})
				.attr("text-achor", "middle")
				.attr("stroke", '#000')
				.attr("stroke-width", "0.5")
				.text(function (d) { return d.id });


			node
				.on("click", clickNode)
				.on('mouseover', mouseOver)
				.call(d3.drag()
					.subject(dragsubject)
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

			simulation
				.nodes(nodes)
				.on("tick", ticked);

			simulation.force("link")
				.links(links);

			function ticked() {
				link.attr("d", positionLink);
				node.attr("transform", positionNode);
			}

			function dragsubject() {
				return simulation.find(d3.event.x, d3.event.y);
			}
	
			function dragstarted() {
				if (!d3.event.active) simulation.alphaTarget(0.3).restart();
				d3.event.subject.fx = d3.event.subject.x;
				d3.event.subject.fy = d3.event.subject.y;
			}
	
			function dragged() {
				d3.event.subject.fx = d3.event.x;
				d3.event.subject.fy = d3.event.y;
			}
	
			function dragended() {
				d3.event.subject.active = false;
			}

		});

		function clickNode() {
			d3.select(this)
				.style("fill", "lightcoral")
				.style("stroke", "red");
		}
		function mouseOver() {
			d3.select(this).style('fill', 'black');
		}
		function positionLink(d) {
			return "M" + d[0].x + "," + d[0].y
				+ "S" + d[1].x + "," + d[1].y
				+ " " + d[2].x + "," + d[2].y;
		}

		function positionNode(d) {
			return "translate(" + d.x + "," + d.y + ")";
		}
	}

	shouldComponentUpdate() {
		// Prevents component re-rendering
		return false;
	}
	resizeCanvas = () => {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}
	render() {
		return (
			<svg width={this.state.width} height={this.state.height}>
				<Links />
				<Nodes />
			</svg>
		)
	}
}
