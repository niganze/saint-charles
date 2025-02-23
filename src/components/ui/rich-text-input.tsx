"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Color as ColorExtension } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Type,
  Paintbrush,
  Highlighter,
  Indent,
  Outdent,
} from "lucide-react";
import { useState } from "react";
import Label from "./input-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

interface ImageAttributes {
  src: string;
  alt?: string;
  title?: string;
  size?: string;
}

interface MenuButtonProps {
  editor: Editor | null;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const MenuButton = ({
  editor,
  onClick,
  isActive,
  disabled,
  children,
}: MenuButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={isActive}
      onPressedChange={onClick}
      disabled={!editor || disabled}
      variant="outline"
      className={cn("h-8 w-8 p-0", isActive && "text-sc-red")}
    >
      {children}
    </Toggle>
  );
};

const ImageSizeExtension = Image.extend({
  addAttributes() {
    const parentAttributes = this.parent?.() ?? {};
    return {
      ...parentAttributes,
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      alt: {
        default: null,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => ({
          title: attributes.title,
        }),
      },
      width: {
        default: "medium",
        parseHTML: (element) => {
          const style = element.getAttribute("style");
          if (style?.includes("width:")) {
            const width = style.match(/width:\s*(\d+)px/)?.[1];
            return width ? `${width}px` : "medium";
          }
          return "medium";
        },
        renderHTML: (attributes) => {
          const sizes = {
            xs: "w-[10%]",
            small: "w-1/4",
            medium: "w-1/2",
            full: "w-full",
            custom: "",
          };

          if (attributes.width?.endsWith("px")) {
            return { style: `width: ${attributes.width}` };
          }
          return { class: sizes[attributes.width as keyof typeof sizes] };
        },
      },
    };
  },
}).configure({
  inline: false,
  allowBase64: false,
});

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

export function RichTextEditor({
  content,
  onChange,
  className,
  height = "h-60",
}: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState("custom");
  const [customSize, setCustomSize] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffeb3b");
  const [linkUrl, setLinkUrl] = useState("");
  const [indentLevel, setIndentLevel] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: {
            class: "my-3 ml-6 list-disc [&>li]:mt-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "my-3 ml-6 list-decimal [&>li]:mt-2",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "mt-3 border-l-2 pl-6 italic",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "mt-3",
          },
        },
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-sc-red underline hover:text-sc-red/80",
        },
      }),
      ImageSizeExtension,
      TextStyle,
      ColorExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Subscript,
      Superscript,
      Highlight.configure({
        multicolor: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-md bg-gray-950 p-4 text-white mt-3",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-full",
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-6",
          "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-6",
          "[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-6",
          "[&_h4]:text-xl [&_h4]:font-bold [&_h4]:tracking-tight [&_h4]:mt-6",
          "[&_h5]:text-lg [&_h5]:font-bold [&_h5]:tracking-tight [&_h5]:mt-6",
          "[&_h6]:text-base [&_h6]:font-bold [&_h6]:tracking-tight [&_h6]:mt-6",
          className
        ),
      },
    },
  });

  const addImage = () => {
    if (imageUrl && editor) {
      const width = customSize ? `${customSize}px` : imageSize;
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: "Image",
          width,
        } as ImageAttributes)
        .run();
      setImageUrl("");
      setCustomSize("");
    }
  };

  const addLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  };

  const handleImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const updateIndentation = (increase: boolean) => {
    if (!editor) return;

    const newLevel = increase ? indentLevel + 1 : Math.max(0, indentLevel - 1);
    setIndentLevel(newLevel);

    editor
      .chain()
      .focus()
      .updateAttributes("paragraph", {
        style: `padding-left: ${newLevel * 2}em`,
      })
      .run();
  };

  if (!editor) return null;

  const headingOptions = [
    { value: "paragraph", label: "Normal Text" },
    { value: "1", label: "Heading 1" },
    { value: "2", label: "Heading 2" },
    { value: "3", label: "Heading 3" },
    { value: "4", label: "Heading 4" },
    { value: "5", label: "Heading 5" },
    { value: "6", label: "Heading 6" },
  ];

  const currentHeading = editor.isActive("heading")
    ? `${editor.getAttributes("heading").level}`
    : "paragraph";

  return (
    <div className={cn("rounded-lg border", className)}>
      <div className="flex flex-wrap gap-1 border-b p-1">
        <Select
          value={currentHeading}
          onValueChange={(value) => {
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
                })
                .run();
            }
          }}
          options={headingOptions}
          className="w-36"
        />

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editor.isActive("subscript")}
        >
          <SubscriptIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive("superscript")}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </MenuButton>

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
        >
          <AlignJustify className="h-4 w-4" />
        </MenuButton>

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() => updateIndentation(true)}
          disabled={indentLevel >= 6}
        >
          <Indent className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => updateIndentation(false)}
          disabled={indentLevel === 0}
        >
          <Outdent className="h-4 w-4" />
        </MenuButton>

        <div className="w-[1px] bg-border mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <Toggle size="sm" variant="outline" className="h-8 w-8 p-0">
              <Paintbrush className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-white shadow-md left-0">
            <div className="space-y-2">
              <Label>Text Color</Label>
              <Input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  editor.chain().focus().setColor(e.target.value).run();
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Toggle size="sm" variant="outline" className="h-8 w-8 p-0">
              <Highlighter className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-white shadow-md left-0">
            <div className="space-y-2">
              <Label>Highlight Color</Label>
              <Input
                type="color"
                value={highlightColor}
                onChange={(e) => {
                  setHighlightColor(e.target.value);
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: e.target.value })
                    .run();
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          editor={editor}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Code className="h-4 w-4" />
        </MenuButton>

        <div className="w-[1px] bg-border mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <Toggle size="sm" variant="outline" className="h-8 w-8 p-0">
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white shadow-md left-0">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="link-url">Link URL</Label>
                <Input
                  id="link-url"
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>
              <Button onClick={addLink}>Add Link</Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-[1px] bg-border mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <Toggle size="sm" variant="outline" className="h-8 w-8 p-0">
              <ImageIcon className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white shadow-md left-0">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={handleImageUrl}
                />
              </div>
              <div className="space-y-2">
                <Label>Image Size</Label>
                <RadioGroup
                  value={imageSize}
                  onValueChange={(val) => {
                    setImageSize(val);
                    setCustomSize("");
                  }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="xs" id="xs" />
                    <Label htmlFor="xs">Extra Small (10%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small">Small (25%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium (50%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full">Full Width</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <div className="flex items-center gap-2">
                      <Label htmlFor="custom">Custom Size</Label>
                      <Input
                        type="number"
                        placeholder="Width in pixels"
                        value={customSize}
                        onChange={(e) => {
                          setCustomSize(e.target.value);
                          setImageSize("custom");
                        }}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">px</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={addImage}>Add Image</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <EditorContent
        editor={editor}
        className={`p-3 min-h-24 overflow-y-auto outline-none ${height}`}
      />
    </div>
  );
}
