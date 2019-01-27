import React, { Component } from 'react';
import axios from 'axios';

interface Props {
  infos: { hostname: string; cpus: any[]; headers: {} };
}
export default class Tiles extends Component<Props> {
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
              {infos.cpus.map(cpu => {
                return <span>{cpu.model}</span>;
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
        <footer>Social networks</footer>
      </div>
    );
  }
}
