import { Decoration, WidgetType, EditorView } from '@codemirror/view';
import { RangeSet, StateField } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import markdoc from '@markdoc/markdoc';

const patternTag = /{%\s*(?<closing>\/)?(?<tag>[a-zA-Z0-9-_]+)(?<attrs>\s+[^]+)?\s*(?<self>\/)?%}\s*$/m;

class RenderBlockWidget extends WidgetType {
  constructor(source, config) {
    super();

    const document = markdoc.parse(source);
    const transformed = markdoc.transform(document, config);
    this.rendered = markdoc.renderers.html(transformed);
  }

  eq(widget) {
    return widget.source === widget.source;
  }

  toDOM() {
    let content = document.createElement('div');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderBlock';
    content.innerHTML = this.rendered;
    return content;
  }

  ignoreEvent() {
    return false;
  }
}

function replaceBlocks(state, config, from, to) {
  const decorations = [];
  const [cursor] = state.selection.ranges;

  const tags = [];
  const stack = [];
  syntaxTree(state).iterate({
    from, to,
    enter(node) {
      if (!['Table', 'Blockquote', 'MarkdocTag', 'Image'].includes(node.name))
        return;

      if (node.name === 'MarkdocTag') {
        const text = state.doc.sliceString(node.from, node.to);
        const match = text.match(patternTag);

        if (match?.groups?.self) {
          tags.push([node.from, node.to]);
          return;
        }

        if (match?.groups?.closing) {
          const last = stack.pop();
          if (last) tags.push([last, node.to]);
          return;
        }

        stack.push(node.from);
        return;
      }

      if (cursor.from >= node.from && cursor.to <= node.to)
        return false;

      const text = state.doc.sliceString(node.from, node.to);
      const decoration = Decoration.replace({
        widget: new RenderBlockWidget(text, config),
        block: true,
      });

      decorations.push(decoration.range(node.from, node.to));
    }
  });

  for (let [from, to] of tags) {
    if (cursor.from >= from && cursor.to <= to) continue;
    const text = state.doc.sliceString(from, to);
    const decoration = Decoration.replace({
      widget: new RenderBlockWidget(text, config),
      block: true,
    });

    decorations.push(decoration.range(from, to));
  }

  return decorations;
}

const returnFunction = (config) => {
    return StateField.define({
        create(state) {
          return RangeSet.of(replaceBlocks(state, config), true);
        },
        update(decorations, transaction) {
          return RangeSet.of(replaceBlocks(transaction.state, config), true);
        },
        provide(field) {
          return EditorView.decorations.from(field);
        },
      });
}
export default returnFunction;