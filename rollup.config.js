import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',  // or other formats
    },
    external: ['ethers', 'lodash', '@walletconnect/ethereum-provider'],
    plugins: [
        typescript()
    ]
};

