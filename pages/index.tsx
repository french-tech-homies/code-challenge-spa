import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
interface Props {
  infos: { hostname: string; cpus: any[]; headers: {} };
}
export default class Home extends Component<Props> {
  static async getInitialProps() {
    const res = await axios('http://localhost:3000/api/fth');
    console.log('res', res.data, res.headers);
    return { infos: { ...res.data, headers: res.headers } };
  }
  render() {
    const { infos } = this.props;
    console.log(infos);
    return (
      <div>
        <header>
          <h1>French Tech Homies</h1>
        </header>
        <Paper elevation={1}>
          <Typography variant="h5" component="h3">
            {infos.hostname}
          </Typography>
        </Paper>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              width: '400px',
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'black',
              margin: 16
            }}
          >
            {infos.hostname}
          </div>
          <div
            style={{
              display: 'flex',
              width: '400px',
              flexDirection: 'column',
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'black',
              margin: 16
            }}
          >
            Number of CPUs: {infos.cpus.length}
            <ul>
              {infos.cpus.map((cpu, i) => {
                return <span key={i}>{cpu.model}</span>;
              })}
            </ul>
          </div>
          <div
            style={{
              display: 'flex',
              width: '400px',
              flexDirection: 'column',
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'black',
              margin: 16
            }}
          >
            {JSON.stringify(infos.headers, null, 2)}
          </div>
        </div>
        <StyledButton>Styled Components</StyledButton>
        <footer>Social networks</footer>
      </div>
    );
  }
}
