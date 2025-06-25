"use client";

import { Fragment, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "./blog-card";
import { BlogCardProps } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BlogCardSm from "./blog-card-sm";
import { dir } from "i18next";
import { useTranslations } from "next-intl";

interface BlogListSectionProps {
    blog_list: {
        id: number;
        title: string;
        blog_categories: {
            id: number;
            documentId: string;
            slug: string;
            category: string;
        }[];
    };
    all_blogs: BlogCardProps[];
    locale: string;
}

const ITEMS_PER_PAGE = 9;

const BlogListSection = ({
    blog_list,
    all_blogs,
    locale,
}: BlogListSectionProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const filteredBlogs = useMemo(() => {
        const blogs =
            activeTab === "all"
                ? [...all_blogs]
                : all_blogs.filter(
                      (blog) => blog.blog_category.slug === activeTab
                  );

        blogs.sort((a, b) => {
            const dateA = new Date(a.hero.date).getTime();
            const dateB = new Date(b.hero.date).getTime();
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

        return blogs;
    }, [all_blogs, activeTab, sortBy]);

    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const currentBlogs = filteredBlogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const t = useTranslations("filter");

    return (
        <section className="max-w-7xl mx-auto py-10 px-3 lg:px-2">
            <div>
                <h2 className="font-semibold text-2xl lg:text-4xl mb-4">
                    {blog_list.title}
                </h2>
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    dir={dir(locale)}
                >
                    <div className="flex justify-between items-start">
                        <TabsList className="space-x-3 font-manrope mb-6 max-w-full overflow-x-scroll scrollbar-none justify-start hidden md:block">
                            <TabsTrigger value="all">{t("all")}</TabsTrigger>
                            {blog_list?.blog_categories?.map((category, i) => (
                                <TabsTrigger
                                    key={category.documentId + i}
                                    value={category.slug}
                                >
                                    {category.category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="flex flex-col gap-2 w-full md:w-fit">
                            <div className="font-manrope flex justify-between md:justify-start items-center gap-2 text-sm md:hidden">
                                <span className="font-medium">Category: </span>
                                <Select
                                    value={activeTab}
                                    onValueChange={(value) => {
                                        handleTabChange(value);
                                    }}
                                >
                                    <SelectTrigger className="w-fit shadow-none rounded-sm border-black/20 focus-visible:ring-0 text-sm font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="font-manrope">
                                        <SelectItem value="all">All</SelectItem>
                                        {blog_list?.blog_categories?.map(
                                            (category, i) => (
                                                <SelectItem
                                                    value={category.slug}
                                                    key={
                                                        category.documentId + i
                                                    }
                                                >
                                                    {category.category}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="font-manrope flex items-center gap-2 text-sm justify-between md:justify-start">
                                <span className="font-medium">
                                    {t("sortBy")}:{" "}
                                </span>
                                <Select
                                    value={sortBy}
                                    onValueChange={(value) => {
                                        setSortBy(value);
                                        setCurrentPage(1); // Optional: Reset to first page on sort
                                    }}
                                >
                                    <SelectTrigger className="w-fit shadow-none rounded-sm border-black/20 focus-visible:ring-0 text-sm font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="font-manrope">
                                        <SelectItem value="newest">
                                            {t("newest")}
                                        </SelectItem>
                                        <SelectItem value="oldest">
                                            {t("oldest")}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <TabsContent
                        value={activeTab}
                        className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-y-10 gap-y-3"
                    >
                        {currentBlogs.map((blog) => (
                            <Fragment key={blog.documentId}>
                                <div className="hidden md:block">
                                    <BlogCard {...blog} />
                                </div>
                                <div className="md:hidden">
                                    <BlogCardSm {...blog} />
                                </div>
                            </Fragment>
                        ))}
                    </TabsContent>
                </Tabs>

                {totalPages > 1 && (
                    <Pagination className="font-manrope mt-10">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(
                                            Math.max(currentPage - 1, 1)
                                        )
                                    }
                                    className="cursor-pointer"
                                />
                            </PaginationItem>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        isActive={page === currentPage}
                                        onClick={() => handlePageChange(page)}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {totalPages > 5 && <PaginationEllipsis />}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(
                                            Math.min(
                                                currentPage + 1,
                                                totalPages
                                            )
                                        )
                                    }
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </section>
    );
};

export default BlogListSection;
