"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import { useState } from "react";
import Label from "./input-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-muted text-muted-foreground"
      )}
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "scroll-m-20 text-2xl font-semibold tracking-tight",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "my-6 ml-6 list-disc [&>li]:mt-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "my-6 ml-6 list-decimal [&>li]:mt-2",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "leading-7 [&:not(:first-child)]:mt-6",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
        },
      }),
      ImageSizeExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-full",
          className
        ),
      },
    },
  });

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

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

  const handleImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  if (!editor) return null;

  return (
    <div className={cn("rounded-lg border", className)}>
      <div className="flex flex-wrap gap-1 border-b p-1">
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

        <div className="w-[1px] bg-border mx-1" />

        <MenuButton
          editor={editor}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          editor={editor}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>

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

        <MenuButton editor={editor} onClick={addLink}>
          <LinkIcon className="h-4 w-4" />
        </MenuButton>

        <Popover>
          <PopoverTrigger asChild>
            <Toggle size="sm" className="h-8 w-8 p-0">
              <ImageIcon className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80">
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
