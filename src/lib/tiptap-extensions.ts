import { Extension, Node, mergeAttributes } from '@tiptap/core';

// --- Indent Extension ---
export const Indent = Extension.create({
  name: 'indent',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading', 'listItem'],
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => parseInt(element.style.marginLeft, 10) / 40 || 0,
            renderHTML: attributes => {
              if (!attributes.indent) return {};
              return { style: `margin-left: ${attributes.indent * 40}px` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      indent: () => ({ commands }) => {
        const currentIndent = this.editor.getAttributes('paragraph').indent || 0;
        return commands.updateAttributes('paragraph', { indent: currentIndent + 1 });
      },
      outdent: () => ({ commands }) => {
        const currentIndent = this.editor.getAttributes('paragraph').indent || 0;
        return commands.updateAttributes('paragraph', { indent: Math.max(0, currentIndent - 1) });
      },
    };
  },
});

// --- RenewBerry Video Extension ---
export const RenewVideo = Node.create({
  name: 'renewVideo',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      title: { default: 'RenewBerry Video' },
      thumbnail: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-renew-video]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div', 
      { 'data-renew-video': '', class: 'renew-video-wrapper my-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20' },
      ['video', { src: HTMLAttributes.src, controls: true, poster: HTMLAttributes.thumbnail, class: 'w-full aspect-video' }],
      ['div', { class: 'bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary flex justify-between' }, 
        ['span', {}, HTMLAttributes.title],
        ['span', {}, 'RenewBerry Official Stream']
      ]
    ];
  },

  addCommands() {
    return {
      setRenewVideo: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
});

// --- Page Break Extension ---
export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  selectable: true,
  draggable: true,

  parseHTML() {
    return [{ tag: 'div.page-break' }];
  },

  renderHTML() {
    return ['div', { class: 'page-break my-8 border-t-2 border-dashed border-gray-200 relative flex justify-center after:content-["PAGE_BREAK"] after:absolute after:-top-3 after:bg-gray-100 after:px-4 after:text-[10px] after:font-black after:text-gray-400 after:tracking-[0.2em]' }];
  },

  addCommands() {
    return {
      setPageBreak: () => ({ commands }) => {
        return commands.insertContent({ type: this.name });
      },
    };
  },
});
