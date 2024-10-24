import {visit} from 'unist-util-visit';

export default function attacher() {
    return (tree) => {
      visit(tree, 'paragraph', (node, index, parent) => {
        //console.log(node.children)
        // 두 칸 띄어쓰기 체크

        node.children.forEach(element => {
            //console.log('star', element.type, /\u200B/.test(element.value))
            if (element.type === 'text' && /\u200B/.test(element.value)) {
                //console.log("ee", parent)
                //console.log("zz", index)
                //parent.children.splice(index, 1);
            }
        });
      });
    };
}