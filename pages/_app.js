// # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// #                                                       #
// #                        _oo0oo_                        #
// #                       o8888888o                       #
// #                       (| -_- |)                       #
// #                       88" . "88                       #
// #                       0\  =  /0                       #
// #                     ___/`---'\___                     #
// #                   .' \|     |// '.                    #
// #                  / \|||  :  |||// \                   #
// #                 / _||||| -:- |||||- \                 #
// #                |   | \\  -  /// |   |                 #
// #                | \_|  ''\---/''  |_/ |                #
// #                \  .-\__  '-'  ___/-. /                #
// #              ___'. .'  /--.--\  `. .'___              #
// #           ."" '<  `.___\_<|>_/___.' >' "".            #
// #          | | :  `- \`.;`\ _ /`;.`/ - ` : | |          #
// #          \  \ `_.   \_ __\ /__ _/   .-` /  /          #
// #      =====`-.____`.___ \_____/___.-`___.-'=====       #
// #                        `=---='                        #
// #                                                       #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

import '../styles/globals.css';

import { MoralisProvider } from 'react-moralis';

import { RecoilRoot } from 'recoil';
import Layout from '../components/common/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </MoralisProvider>
  );
}

export default MyApp;
