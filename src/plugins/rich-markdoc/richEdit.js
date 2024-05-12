import { Decoration } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';

const tokenElement = [
  'InlineCode',
  'Emphasis',
  'StrongEmphasis',
  'FencedCode',
  'Link',
  'Image',
  'Strikethrough'
];

const tokenHidden = [
  'HardBreak',
  'LinkMark',
  'EmphasisMark',
  'CodeMark',
  'CodeInfo',
  'URL',
  'StrikethroughMark'
];

const decorationHidden = Decoration.mark({ class: 'cm-markdoc-hidden' });
const decorationBullet = Decoration.mark({ class: 'cm-markdoc-bullet' });
const decorationCode = Decoration.mark({ class: 'cm-markdoc-code' });
const decorationTag = Decoration.mark({ class: 'cm-markdoc-tag' });

export default class RichEditPlugin {
  constructor(view) {
    this.decorations = this.process(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged || update.selectionSet)
      this.decorations = this.process(update.view);
  }
  process(view) {
    let widgets = [];
    let [cursor] = view.state.selection.ranges;

    for (let { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from, to,
        enter(node) {
          console.log("a", node.name)
          if (node.name === 'MarkdocTag')
            widgets.push(decorationTag.range(node.from, node.to));

          if (node.name === 'FencedCode')
            widgets.push(decorationCode.range(node.from, node.to));

          if ((node.name.startsWith('ATXHeading') || tokenElement.includes(node.name)) &&
            cursor.from >= node.from && cursor.to <= node.to)
            return false;

          if (node.name === 'ListMark' && node.matchContext(['BulletList', 'ListItem']) &&
            cursor.from !== node.from && cursor.from !== node.from + 1)
            widgets.push(decorationBullet.range(node.from, node.to));

          if (node.name === 'HeaderMark')
            widgets.push(decorationHidden.range(node.from, node.to + 1));

          if (tokenHidden.includes(node.name))
            widgets.push(decorationHidden.range(node.from, node.to));
        }
      });
    }

    return Decoration.set(widgets);
  }
}