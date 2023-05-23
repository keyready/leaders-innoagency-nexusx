import * as path from 'path';
import { BuildEnv } from './config/build/config/types';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const port = env.port || 3000;
    const buildPath = env.buildPath || 'dist';
    const apiUrl = env.apiUrl || 'http://localhost:9999';

    return buildWebpackConfig({
        mode,
        paths: {
            entry: path.resolve(__dirname, 'src'),
            dist: path.resolve(__dirname, buildPath),
            html: path.resolve(__dirname, 'public/index.html'),
            src: path.resolve(__dirname, 'src'),
            localesFrom: path.resolve(__dirname, 'public/locales'),
            localesTo: path.resolve(__dirname, `${buildPath}/locales`),
        },
        isDev,
        port,
        apiUrl,
    });
};
