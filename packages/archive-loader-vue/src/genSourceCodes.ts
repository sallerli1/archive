/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { SourceCode } from './types'

import { type MarkdownRenderer } from '@idux/archive-vite-markdown-plugin'

import { META_BLOCK_TYPE } from './parseMeta'

export function genSourceCode(filename: string, code: string, md: MarkdownRenderer): SourceCode {
  const _code = code.replace(new RegExp(`<${META_BLOCK_TYPE}.*>.*</${META_BLOCK_TYPE}>`, 's'), '').trim()
  return {
    filename: filename,
    code: _code,
    parsedCode: md.render('```html \r\n' + _code + '\r\n ```'),
  }
}
