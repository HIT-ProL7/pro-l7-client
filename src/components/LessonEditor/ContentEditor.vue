<script setup>
import { ref, onMounted, onBeforeUnmount, inject, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useLessonStore } from '@/stores/lessonStore';
import { useMessage } from 'naive-ui';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3';

import FormatBoldIcon from '@assets/editor-icon/FormatBold.svg';
import FormatItalicIcon from '@assets/editor-icon/FormatItalic.svg';
import FormatStrikethroughIcon from '@assets/editor-icon/FormatStrikethrough.svg';
import FormatHeader1Icon from '@assets/editor-icon/FormatHeader1.svg';
import FormatHeader2Icon from '@assets/editor-icon/FormatHeader2.svg';
import FormatHeader3Icon from '@assets/editor-icon/FormatHeader3.svg';
import FormatListBulletedIcon from '@assets/editor-icon/FormatListBulleted.svg';
import FormatListNumberedIcon from '@assets/editor-icon/FormatListNumbered.svg';
import CodeBracesIcon from '@assets/editor-icon/CodeBraces.svg';
import CodeBlockBracesIcon from '@assets/editor-icon/CodeBlockBraces.svg';
import FormatQuoteCloseIcon from '@assets/editor-icon/FormatQuoteClose.svg';
import MinusIcon from '@assets/editor-icon/Minus.svg';
import YoutubeIcon from '@assets/editor-icon/Youtube.svg';
import ImageEditIcon from '@assets/editor-icon/ImageEdit.svg';
import LinkVariantIcon from '@assets/editor-icon/LinkVariant.svg';
import UndoIcon from '@assets/editor-icon/Undo.svg';
import RedoIcon from '@assets/editor-icon/Redo.svg';
import FormatAlignLeftIcon from '@assets/editor-icon/FormatAlignLeft.svg';
import FormatAlignRightIcon from '@assets/editor-icon/FormatAlignRight.svg';
import FormatAlignCenterIcon from '@assets/editor-icon/FormatAlignCenter.svg';
import FormatAlignJustifyIcon from '@assets/editor-icon/FormatAlignJustify.svg';
import ContentSaveIcon from '@assets/editor-icon/ContentSave.svg';

const content = ref('');
const contentLesson = inject('contentLesson');
const exerciseLesson = inject('exerciseLesson');
const props = defineProps({
  option: { String, require: true }
});
const message = useMessage();

const editor = useEditor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit,
    Youtube,
    Image,
    Link,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    })
  ],
  content: ''
});

function setLink() {
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }
  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }
  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}

function addVideo() {
  const url = prompt('Enter YouTube URL');
  editor.value.commands.setYoutubeVideo({
    src: url,
    width: '100%',
    height: 560
  });
}

function addImage() {
  const url = window.prompt('URL');
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
}

function getContent() {
  content.value = editor.value.getHTML();
  if (props.option == 'content') contentLesson.value = editor.value.getHTML();
  else exerciseLesson.value = editor.value.getHTML();
  message.success('Lưu thành công!');
}

const lessonStore = useLessonStore();
const route = useRoute();

async function getDetailLesson() {
  await lessonStore.getDetailLesson(route.query.lessonId);
  if (props.option == 'content') editor.value.commands.setContent(lessonStore.lesson.content);
  else editor.value.commands.setContent(lessonStore.exercise.content);
}

onMounted(() => {
  if (route.query.option == 'edit') {
    getDetailLesson();
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
<template>
  <div v-if="editor" class="editer-container">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <img :src="FormatBoldIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <img :src="FormatItalicIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <img :src="FormatStrikethroughIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <img :src="FormatHeader1Icon" alt="" />
          <!-- <FormatHeader1Icon title="Heading 1" /> -->
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          <img :src="FormatHeader2Icon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          <img :src="FormatHeader3Icon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <img :src="FormatAlignLeftIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <img :src="FormatAlignCenterIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <img :src="FormatAlignRightIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <img :src="FormatAlignJustifyIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <img :src="FormatListBulletedIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <img :src="FormatListNumberedIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <img :src="CodeBracesIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <img :src="CodeBlockBracesIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <img :src="FormatQuoteCloseIcon" alt="" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <img :src="MinusIcon" alt="" />
        </button>
        <button id="add" @click="addVideo">
          <img :src="YoutubeIcon" alt="" />
        </button>
        <button @click="addImage">
          <img :src="ImageEditIcon" alt="" />
        </button>
        <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
          <img :src="LinkVariantIcon" alt="" />
        </button>
        <input
          type="color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
          :value="editor.getAttributes('textStyle').color"
        />
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <img :src="UndoIcon" alt="" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <img :src="RedoIcon" alt="" />
        </button>
        <button @click="getContent()">
          <img :src="ContentSaveIcon" alt="" />
        </button>
      </div>
    </div>
    <EditorContent :editor="editor" class="editor" />
  </div>
</template>
<style lang="scss">
/* Basic editor styles */
.editer-container {
  padding: 16px;
  color: #000;
  .control-group {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 3px solid;
    .is-active {
      background-color: #b8b8b8;
      border-radius: 4px;
    }
    button {
      padding: 4px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
    .button-group {
      display: flex;
      flex-wrap: wrap;
    }
    .editor {
      > div {
        height: 500px;
      }
    }
  }
}
.tiptap {
  padding: 8px;
  :first-child {
    margin-top: 0;
  }
  a {
    color: blue;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid #000;
    }
  }
  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: plum;
    border-radius: 0.4rem;
    color: #000;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #4c4c4c;
    border-radius: 0.5rem;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid #ccc;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 2rem 0;
  }
}
</style>
