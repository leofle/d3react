import styled from 'styled-components'

const Body = styled.body`
	margin: 0;
	padding: 0;
	font-family: sans-serif;
`;


const Container = styled.div`
	display:flex;
	justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Card = styled.div`
	margin: 24px;
	padding: 16px;
	color: #757575;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

export {Body, Container, Title, Card};