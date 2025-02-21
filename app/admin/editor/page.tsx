'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Editor from "@/components/admin-dashboard/editor/editor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import {
    Bold,
    Italic,
    Underline,
    Heading1,
    ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// -----------------------------------------------------------
// 1) Zod Schema Definition & defaultValues
// -----------------------------------------------------------
const postSchema = z.object({
    title: z.string().min(1, "Titel darf nicht leer sein"),
    type: z.enum(["post", "project"]),
    status: z.enum(["draft", "published"]),
    author: z.string().optional(),
    publishedAt: z.string().optional(),
    summary: z.string().optional(),
    // For a real app, handle file uploads carefully. Here, we only store
    // a file reference or URL for demonstration.
    image: z.any().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

// -----------------------------------------------------------
// 2) Sample interface for the Editor's exposed methods
// -----------------------------------------------------------
interface EditorInstance {
    getContent: () => any;
    getEditor?: () => any; // Expose raw editor for advanced commands (bold, italic, etc.)
}

export default function NewPostPage() {
    // 2a) React Hook Form setup
    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            type: "post",
            status: "draft",
            author: "",
            publishedAt: "",
            summary: "",
            image: "",
        },
        mode: "onChange",
    });

    // 2b) Editor Ref
    const editorRef = useRef<EditorInstance>(null);

    // 2c) Collapsible toggle
    const [openMeta, setOpenMeta] = useState(true);

    // 3) Image preview states
    const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Whenever headerImageFile changes, generate preview URL
    useEffect(() => {
        if (!headerImageFile) {
            setPreviewUrl("");
            return;
        }
        const objectUrl = URL.createObjectURL(headerImageFile);
        setPreviewUrl(objectUrl);

        // Revoke data uri when component unmounts or file changes
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [headerImageFile]);

    // 4) Editor toolbar functionality
    const handleToggleBold = () => {
        const editor = editorRef.current?.getEditor?.();
        if (!editor) return;
        editor.chain().focus().toggleBold().run();
    };

    const handleToggleItalic = () => {
        const editor = editorRef.current?.getEditor?.();
        if (!editor) return;
        editor.chain().focus().toggleItalic().run();
    };

    const handleToggleUnderline = () => {
        const editor = editorRef.current?.getEditor?.();
        if (!editor) return;
        // Tiptap requires an extension for underline or use textDecoration extension.
        // For demonstration, if you add extension, do:
        //   editor.chain().focus().toggleUnderline().run();
        alert("Please add underline extension to Tiptap.");
    };

    const handleHeading1 = () => {
        const editor = editorRef.current?.getEditor?.();
        if (!editor) return;
        // Set heading level 1
        editor.chain().focus().toggleHeading({ level: 1 }).run();
    };

    // 5) Submit Handler
    const onSubmit = (data: PostFormValues) => {
        if (!editorRef.current) return;
        const content = editorRef.current.getContent();

        // Combine metadata and content
        const postData = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            content,
            // For demonstration only. In a real scenario, you'd upload this file somewhere.
            image: headerImageFile ? headerImageFile.name : "",
        };

        console.log("Saving new entry:", postData);
        alert("Daten (dummy) gespeichert! Siehe Konsole");
    };

    // 6) File Input OnChange
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setHeaderImageFile(e.target.files[0]);
            // Set form value for image if needed
            form.setValue("image", e.target.files[0]);
        }
    };

    // Derived states for toggles
    const editor = editorRef.current?.getEditor?.();
    const isBoldActive = editor?.isActive("bold") || false;
    const isItalicActive = editor?.isActive("italic") || false;
    // underline, heading etc. if extension is installed.

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full h-full">
                {/* Top bar with Save button */}
                <div className="sticky top-0 z-20 flex items-center justify-end w-full border-b bg-background p-4">
                    <Button type="submit" className="mr-4">
                        Speichern
                    </Button>
                </div>

                {/* The main content area */}
                <div className="flex-1 overflow-auto">
                    {/* Page container */}
                    <div className="max-w-4xl mx-auto mt-4 px-4 pb-24">
                        {/* Title input - also acts as page title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Titel"
                                            className="mb-4 text-3xl font-semibold border-0 px-0 focus:ring-0 focus-visible:ring-0 bg-transparent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Collapsible metadata section */}
                        <Collapsible open={openMeta} onOpenChange={setOpenMeta}>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2 mb-2 text-muted-foreground">
                                    <ChevronsUpDown
                                        className={`h-5 w-5 transition-transform ${openMeta ? "" : "rotate-180"
                                            }`}
                                    />
                                </Button>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <div className="mb-4">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        {/* Type */}
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground">Typ</FormLabel>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Wähle den Typ" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="post">Blogpost</SelectItem>
                                                            <SelectItem value="project">Projekt</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Status */}
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground">Status</FormLabel>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Wähle den Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="draft">Entwurf</SelectItem>
                                                            <SelectItem value="published">Veröffentlicht</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Author */}
                                        <FormField

                                            control={form.control}
                                            name="author"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground">Autor/in</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Autor/in" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* PublishedAt */}
                                        <FormField
                                            control={form.control}
                                            name="publishedAt"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground">Veröffentlichungsdatum</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" placeholder="Datum" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Summary */}
                                        <FormField
                                            control={form.control}
                                            name="summary"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel className="text-muted-foreground">Zusammenfassung</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Kurze Zusammenfassung"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Header Image File */}
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground">Headerbild (Datei)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                    {previewUrl && (
                                                        <Image
                                                            src={previewUrl}
                                                            alt="Header preview"
                                                            className="mt-2  rounded-xl border"
                                                            width="50"
                                                            height="50"
                                                        />
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Editor section */}
                        <div className="rounded-t-2xl border shadow-sm my-8">
                            {/* Minimal toolbar example with ToggleGroup from shadcn/ui */}
                            <ToggleGroup
                                type="multiple"
                                className="flex space-x-2 border-b p-2 bg-secondary/30 rounded-t-2xl"
                                onValueChange={() => {
                                    // For a fully controlled approach, handle the logic here
                                    // e.g. toggling bold, italic, etc. based on the new array
                                    // of toggled values.
                                }}
                            >
                                <ToggleGroupItem
                                    value="bold"
                                    aria-pressed={isBoldActive}
                                    onClick={handleToggleBold}
                                    aria-label="Toggle Bold"
                                >
                                    <Bold className="h-4 w-4" />
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="italic"
                                    aria-pressed={isItalicActive}
                                    onClick={handleToggleItalic}
                                    aria-label="Toggle Italic"
                                >
                                    <Italic className="h-4 w-4" />
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="underline"
                                    onClick={handleToggleUnderline}
                                    aria-label="Toggle Underline"
                                >
                                    <Underline className="h-4 w-4" />
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="heading1"
                                    onClick={handleHeading1}
                                    aria-label="Heading 1"
                                >
                                    <Heading1 className="h-4 w-4" />
                                </ToggleGroupItem>
                            </ToggleGroup>

                            {/* Tiptap editor content */}
                            <Editor ref={editorRef} />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}