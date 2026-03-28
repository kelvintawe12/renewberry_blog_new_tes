import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import FontFamily from '@tiptap/extension-font-family';
import Youtube from '@tiptap/extension-youtube';
import CodeBlock from '@tiptap/extension-code-block';
import { Indent, RenewVideo, PageBreak } from './tiptap-extensions';

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
    codeBlock: false,
    // dropCursor and gapCursor are included by default in StarterKit
  }),
  TextStyle,
  Color,
  FontFamily,
  Underline,
  Typography,
  Subscript,
  Superscript,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image'],
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return 'Start your RenewBerry masterpiece...';
    },
  }),
  Highlight.configure({ multicolor: true }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 underline cursor-pointer',
    },
  }),
  Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        width: {
          default: '100%',
          renderHTML: attributes => ({
            style: `width: ${attributes.width}; height: auto;`,
          }),
        },
        align: {
          default: 'center',
          renderHTML: attributes => ({
            class: `image-align-${attributes.align}`,
          }),
        },
      }
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-2xl transition-all duration-300 shadow-lg border border-black/5',
    },
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
    HTMLAttributes: {
      class: 'rounded-2xl shadow-2xl overflow-hidden border-4 border-white my-8',
    },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'bg-gray-900 text-gray-100 rounded-2xl p-6 font-mono text-sm my-8 shadow-2xl border border-white/10',
    },
  }),
  Indent,
  RenewVideo,
  PageBreak,
  CharacterCount,
];
