import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;
const pkg = require('./package.json');

const preprocess = sveltePreprocess({
  preserve: ['systemjs-importmap'],
  postcss: {
    plugins: [
      require('postcss-nested'),
      require('tailwindcss')('./tailwind.config.js'),
    ],
  },
})

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev', '--single', '--host'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const buildDirectory = 'public/'
    
export default {
    input: 'src/App.svelte',
    output: {
			// format: 'iife',
			// file: buildDirectory+'build/bundle.js'
			sourcemap: true,
			format: 'es',
			dir: buildDirectory+'build',
			name: 'app',
		},
    plugins: [
    svelte({ preprocess, customElement: true, include: /\.wc\.svelte$/ }),
		svelte({
      customElement: false,
      exclude: /\.wc\.svelte$/,
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('bundle.css');
			},
			preprocess,
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ 
      resolveJsonModule: true,
      sourceMap: !production 
    }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(buildDirectory),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
  ],
	watch: {
		clearScreen: false
	}
};