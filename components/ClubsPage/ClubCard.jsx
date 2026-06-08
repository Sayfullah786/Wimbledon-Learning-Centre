import React, { useMemo } from "react";
import { Calendar, Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export const ClubCard = ({ club, onApply }) => {
  // Format schedules into display info
  const scheduleInfo = useMemo(() => {
    if (!club.schedules || club.schedules.length === 0) return null;
    return club.schedules.map((s) => ({
      day: s.day_of_week,
      time: `${s.start_time?.substring(0, 5)} - ${s.end_time?.substring(0, 5)}`,
    }));
  }, [club.schedules]);

  // Group dates by month
  const groupedDates = useMemo(() => {
    if (!club.blocks || club.blocks.length === 0) return null;
    let allDates = [];
    club.blocks.forEach(b => {
      if (b.dates) allDates = allDates.concat(b.dates);
    });
    if (allDates.length === 0) return null;

    const groups = {};
    const sorted = allDates.sort((a, b) => new Date(a.session_date) - new Date(b.session_date));

    sorted.forEach(d => {
      const dateObj = new Date(d.session_date);
      const monthName = dateObj.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      const dayStr = String(dateObj.getDate()).padStart(2, '0');
      const monthStr = String(dateObj.getMonth() + 1).padStart(2, '0');
      const formattedDate = `${dayStr}/${monthStr}`;

      if (!groups[monthName]) groups[monthName] = [];
      groups[monthName].push(formattedDate);
    });

    return groups;
  }, [club.blocks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-main/30 hover:shadow-[0_8px_30px_rgba(34,158,189,0.10)] transition-[border-color,box-shadow] duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full rounded-r-full bg-gradient-to-b from-main to-[#4cc9e0]" />

      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-main/10 to-sec/10 flex items-center justify-center flex-shrink-0">
          <Code className="w-7 h-7 text-main" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">
            {club.name}
          </h3>
          <p className="text-main text-sm font-medium mt-1">
            {groupedDates && Object.values(groupedDates).flat().length > 0
              ? `${Object.values(groupedDates).flat().length} Sessions`
              : "Weekly Sessions"}{" "}
            • Year {club.min_year_group}–{club.max_year_group}
          </p>
        </div>
      </div>

      {/* Schedule Info */}
      {scheduleInfo && (
        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-main" />
            <span className="text-sm font-semibold text-gray-900">Schedule</span>
          </div>
          <div className="space-y-1.5">
            {scheduleInfo.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-gray-900 font-medium min-w-[7rem]">
                  {s.day}
                </span>
                <span className="text-gray-600">{s.time}</span>
              </div>
            ))}
          </div>
          {groupedDates && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900 block mb-1 text-sm">Dates: </span>
              <div className="space-y-1.5">
                {Object.entries(groupedDates).map(([month, dateList], i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-gray-900 font-medium min-w-[7rem]">
                      {month}
                    </span>
                    <div className="flex flex-wrap gap-2 text-gray-600">
                      {dateList.map((day, j) => (
                        <span key={j}>
                          {day}{j < dateList.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
        {club.description ? club.description
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim() : ''}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {scheduleInfo?.[0] && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {scheduleInfo[0].day}s
            </span>
          )}
          {club.price_per_block > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-main bg-main/10 rounded-full px-3 py-1.5">
              £{parseFloat(club.price_per_block).toFixed(0)} / session
            </span>
          )}
        </div>
        <Button size="m" variant="primary" icon={ArrowRight} onClick={onApply}>
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};
