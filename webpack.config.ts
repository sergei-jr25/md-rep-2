import {
	IBuildPaths,
	TypeMode,
	TypePLatform,
	buldWebpack,
} from '@sergeri-jr25/build-config'

import path from 'path'
import webpack from 'webpack'
import PackageJson from './package.json'

interface IEnvVariable {
	mode: TypeMode
	port: number
	analyzer: boolean
	platform?: TypePLatform
}
console.log('test buldWebpack', buldWebpack)
export default (env: IEnvVariable) => {
	const isDev = env.mode === 'development'
	const paths: IBuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const config: webpack.Configuration = buldWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 5001,
		paths,
		analyzer: false,
		platform: env.platform ?? 'desktop',
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'shop',
			filename: 'remoteEntry.js',
			exposes: {
				'./Router': '/src/components/App.tsx', // './Router': '/src/components/router/Router.tsx',
			},
			shared: {
				...PackageJson.dependencies,
				react: {
					eager: true,
					requiredVersion: PackageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					requiredVersion: PackageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					requiredVersion: PackageJson.dependencies['react-dom'],
				},
			},
		})
	)

	return config
}
