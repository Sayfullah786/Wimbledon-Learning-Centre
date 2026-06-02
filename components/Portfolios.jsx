"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./ui/Button";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import portfoliosData from "@/constants/portfolios";

const Portfolios = () => {
  const [activeClass, setActiveClass] = useState(portfoliosData[0].id);
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;
  const currentClass = portfoliosData.find((cls) => cls.id === activeClass);

  const totalPages = Math.ceil(
    (currentClass?.students?.length || 0) / studentsPerPage
  );

  const startIndex = (currentPage - 1) * studentsPerPage;
  const visibleStudents = currentClass?.students?.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handleClassChange = (classId) => {
    setActiveClass(classId);
    setCurrentPage(1); // reset page on class change
  };

  return (
    <section id="portfolios" data-lenis-scroll-to className="bg-sec/5 p-sec">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-bebas h1">Our Students Portfolios</h1>
        <h4 className="leading-normal h4">
          Results-Driven Tuition.
          <br />
          Maths and English Experts.
        </h4>
      </div>

      {/* Class Tabs */}
      <div className="mt-10 flex flex-wrap justify-center">
        {portfoliosData.map((cls) => (
          <button
            key={cls.id}
            className={`hover:bg-sec/10 border-b-2 rounded-t-lg rounded-b-[1px] text-xs px-5 py-1 font-medium transition-all duration-200 ${
              activeClass === cls.id ? "border-b-sec" : "border-b-sec/30"
            }`}
            onClick={() => handleClassChange(cls.id)}
          >
            {cls.name}
          </button>
        ))}
      </div>

      {/* Students Grid */}
      <div className="maxWSec mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
        {visibleStudents?.length ? (
          visibleStudents.map((student) => (
            <div key={student.id} className="flex flex-col gap-1 group">
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 text-white rounded-lg shadow-lg overflow-hidden text-center relative w-full aspect-[1.35]"
              >
                <Image
                  src={student.image}
                  alt={student.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 absolute left-0 bottom-0 w-full h-full p-3 flex flex-col justify-end items-start bg-gradient-to-t from-black/50 to-black/20 backdrop-blur-sm">
                  <p className="text-xs text-white">{student.portfolio}</p>
                </div>
              </Link>
              <div className="flex justify-between px-1">
                <h3 className="text-sm leading-tight p-1 truncate">
                  {student.name}
                </h3>
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-5 h-5 p-1 rounded-sm group-hover:bg-gray-200"
                >
                  <ExternalLink className="size-full text-300" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No portfolios available for this class.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            size="s"
            variant="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            icon={ChevronLeft}
            className="shadow-lg"
          />

          {/* {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                currentPage === i + 1
                  ? "bg-sec text-white"
                  : "bg-white/70 hover:bg-sec/10"
              }`}
            >
              {i + 1}
            </button>
          ))} */}

          <Button
            size="s"
            variant="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            icon={ChevronRight}
            className="shadow-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Portfolios;
