/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { LoadedItem } from './types'
import type { SetOptional } from 'type-fest'

export const BASIC_HMR_SCRIPT = `;if(__import_meta_hot__){__import_meta_hot__.accept(() => {__import_meta_hot__.invalidate()})}`
// export const BASIC_HMR_SCRIPT = ''

function itemScriptGenerator(item: LoadedItem): string {
  const _item = { ...item } as SetOptional<LoadedItem, 'prependScript' | 'instanceScript' | 'loader' | 'absolutePath'>
  delete _item.prependScript
  delete _item.instanceScript
  delete _item.loader
  delete _item.absolutePath

  return `{
    ${JSON.stringify(_item).slice(1, -1)},
    instance: ${item.instanceScript},
  }`
}

export function genDataScript(item: LoadedItem): string {
  return `${item.prependScript ?? ''}

export default ${itemScriptGenerator(item)}${BASIC_HMR_SCRIPT}`
}

export function genAllDataScript(allItems: LoadedItem[], getModule: (item: LoadedItem) => string): string {
  const imports = allItems.reduce(
    (script, item, idx) => script + `import Item${idx} from '${getModule(item)}'` + '\n',
    '',
  )
  return `${imports}export default {${allItems
    .map((item, idx) => `${JSON.stringify(item.relativePath)}: Item${idx}`)
    .join(',')}}${BASIC_HMR_SCRIPT}`
}
