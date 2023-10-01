import { dts } from "rollup-plugin-dts"
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const nodeResolve = require('@rollup/plugin-node-resolve');

const dist = 'lib'
const bundleName = 'confettis'

const banner = '/*\n'
	+ ' *\n'
	+ ' *  🎉 Confettis v' + process.env.npm_package_version + '\n'
	+ ' *  https://github.com/ovniroto/confettis\n'
	+ ' *\n'
	+ ' *  (c) ' + new Date().getFullYear() + ' Lucas O. S.\n'
	+ ' *  Confettis may be freely distributed under the MIT license.\n'
	+ ' *\n'
	+ '*/\n';

const config = {
	input: './src/index.ts',
	plugins: [
		typescript({ tsconfig: './tsconfig.json' })
	]
}

if(process.env.NODE_ENV === 'cjs') {
	config.output = {
		file: `${dist}/${bundleName}.js`,
		format: 'cjs',
		banner: banner
	}
}

if(process.env.NODE_ENV === 'umd') {
	config.output = {
		file: `${dist}/${bundleName}.umd.js`,
		format: 'umd',
		name: 'confetti',
		banner: banner
	}
}

if(process.env.NODE_ENV === 'esm') {
	config.output = {
		file: `${dist}/${bundleName}.esm.js`,
		format: 'esm',
		banner: banner
	}
}

if(process.env.NODE_ENV === 'minify') {
	config.output = {
		file: `${dist}/${bundleName}.min.js`,
		format: 'iife',
		name: 'confetti'
	}
	config.plugins.push(nodeResolve({ browser: true }));
	config.plugins.push(terser({}));
}

if(process.env.NODE_ENV === 'types') {
	config.input = `./${dist}/dts/index.d.ts`,
	config.output = {
		file: `${dist}/types.d.ts`,
		format: 'es',
		banner: banner
	}
    config.plugins = [dts()]
}

export default config;