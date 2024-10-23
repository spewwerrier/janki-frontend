
import React from 'react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';

// let markdown = "okay"
interface MarkdownEditorProps{
  markdown: string;
}

const MilkdownEditor: React.FC<MarkdownEditorProps> = ({markdown}) => {
    const { get } = useEditor((root) =>
      Editor.make()
      .config((ctx)=>{
        const listener = ctx.get(listenerCtx);

        listener.markdownUpdated((ctx, markdown)=>{
          console.log(markdown)
        })
      })
      .use(listener)
        .config(nord)
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, markdown)
        })
        .use(commonmark),
  );

  return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC<MarkdownEditorProps> = ({markdown}) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor markdown={markdown} />
    </MilkdownProvider>
  );
};
