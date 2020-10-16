/**
 * Default extensions
 */

import { IExtension, IExtensionEntry } from '@/core/extension';
import * as ExploreBarPkg from './explore/package.json';
import * as SearchBarPkg from './search/package.json';

const requireContext = require.context('./');

const ExploreBar: IExtension = ExploreBarPkg as any; // require('./explore/package.json');
ExploreBar.activate = require('./explore/src/index').activate;


const SearchBar: IExtension = SearchBarPkg as any; // require('./search/package.json');
SearchBar.activate = require('./search/src/index').activate;

export const defaultExtensions: IExtensionEntry = {
    location: requireContext,
    extensions: [
        ExploreBar,
        SearchBar,
        // 'theme-defaults',
        // 'theme-monokai',
    ],
};