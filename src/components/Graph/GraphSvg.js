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

	componentDidMount() {
		let svg = d3.select("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height"),
			radius = 5;

		// svg
		// .attr("preserveAspectRatio", "xMinYMin meet")
		// .attr("viewBox", "0 0 960 900");

		let color = scaleOrdinal()
			.range(['green', 'blue', 'pink', 'red', 'black', 'yellow', 'orange', 'purple', 'cyan']);

			
		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink()
			.distance(10)
			.strength(.05)
			.id(function (d) { return d.id; }))
			.force("charge", d3.forceManyBody().strength(-90))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force('collide', d3.forceCollide([radius])
			.iterations(20))

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
			.selectAll("circle")
				.data(nodes.filter(function (d) { return d.id; }))
				.enter().append("circle")
				.attr("class", "node")
				.attr("r", function (d) { return d.id.length })
				.attr("fill", function (d) { return color(d.group); })
				.on("click", clickNode)
				.on('mouseover', mouseOver)
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

			node.append("title")
				.text(function (d) { return d.id; });

			simulation
				.nodes(nodes)
				.on("tick", ticked);

			simulation.force("link")
				.links(links);

			function ticked() {
				link.attr("d", positionLink);
				node.attr("transform", positionNode);
			}
			
		});

		function clickNode() {
			d3.select(this)
				.style("fill","lightcoral")
				.style("stroke","red");
		}
		function mouseOver(){
			d3.select(this).style('fill','black');
		}
		function positionLink(d) {
			return "M" + d[0].x + "," + d[0].y
				+ "S" + d[1].x + "," + d[1].y
				+ " " + d[2].x + "," + d[2].y;
		}

		function positionNode(d) {
			return "translate(" + d.x + "," + d.y + ")";
		}

		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragended(d) {
			d3.event.subject.active = false;
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}
	}

	shouldComponentUpdate() {
		// Prevents component re-rendering
		return false;
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
