import React, { useMemo } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const ClubDetail = ({ club, activeBlock, school, backHref, router, remainingSessionsCount, pastSessionsCount }) => {
  const price = (club.price_per_block ? parseFloat(club.price_per_block) : 11.00) * remainingSessionsCount;

  const dates = useMemo(() => {
    if (!activeBlock) return [];

    if (activeBlock.session_dates && activeBlock.session_dates.length > 0) {
      const groups = {};
      const currentLondonStr = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/London' }).replace(' ', 'T');
      const startTimeStr = club.schedules?.[0]?.start_time || "00:00";

      activeBlock.session_dates.forEach((sd) => {
        const dStr = sd.session_date.substring(0, 10);
        const sessionDateTimeStr = `${dStr}T${startTimeStr}:00`;
        const isMissed = sessionDateTimeStr < currentLondonStr;

        const dateObj = new Date(sd.session_date);
        const monthName = dateObj.toLocaleDateString("en-GB", { month: "long" });
        const dayStr = String(dateObj.getDate()).padStart(2, "0");
        const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
        const formattedDate = `${dayStr}/${monthStr}`;
        if (!groups[monthName]) groups[monthName] = [];
        groups[monthName].push({ text: formattedDate, isMissed });
      });
      return Object.entries(groups).map(([month, days]) => ({
        month,
        days,
      }));
    }

    const start = new Date(activeBlock.block_start_date);
    const end = new Date(activeBlock.block_end_date);
    const options = { month: "short", day: "numeric" };
    return [
      {
        month: start.toLocaleDateString("en-GB", { month: "long" }),
        days: [{ text: `Starts ${start.toLocaleDateString("en-GB", options)}`, isMissed: false }, { text: `Ends ${end.toLocaleDateString("en-GB", options)}`, isMissed: false }],
      },
    ];
  }, [activeBlock, club.schedules]);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => router.push(backHref)}
          className="hover:text-main font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Clubs
        </button>
      </div>

      {/* Title */}
      <div>
        <h1 className="font-bebas text-4xl sm:text-5xl text-gray-900 leading-tight tracking-wide">
          {club.name}
        </h1>
        <p className="text-main font-semibold mt-2 text-base">{club.school_name || "Coding Club"}</p>
      </div>

      {/* Description */}
      <div
        className="club-description"
        dangerouslySetInnerHTML={{ __html: club.description }}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-main/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-main" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Sessions</p>
            <p className="text-gray-900 font-bold text-lg">
              {remainingSessionsCount} <span className="text-sm font-normal text-gray-400">({pastSessionsCount} missed)</span>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-main/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-main" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Year Group</p>
            <p className="text-gray-900 font-bold text-lg">
              Year {club.min_year_group}–{club.max_year_group}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-gradient-to-r from-main/5 to-[#4cc9e0]/5 border border-main/15 rounded-2xl p-5">
        <p className="text-xs text-gray-400 font-medium mb-1">Total Price</p>
        <p className="font-bebas text-5xl text-main tracking-wide">
          £{price.toFixed(2)}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          for {remainingSessionsCount} remaining session{remainingSessionsCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Dates */}
      {dates.length > 0 && (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-main" />
            <span className="text-sm font-semibold text-gray-900">Schedule</span>
          </div>

          <div className="space-y-1.5">
            {club.schedules?.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-gray-900 font-medium min-w-[6rem]">
                  {s.day_of_week}
                </span>
                <span className="text-gray-600">
                  {s.start_time.slice(0, 5)} - {s.end_time.slice(0, 5)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="font-semibold text-gray-900 block mb-2 text-sm">Dates:</span>
            <div className="space-y-1.5">
              {dates.map((d, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-gray-900 font-medium min-w-[6rem]">
                    {d.month}
                  </span>
                  <div className="flex flex-wrap gap-2 text-gray-600">
                    {d.days.map((dayObj, j) => (
                      <span key={j} className={dayObj.isMissed ? "line-through text-gray-400" : ""}>
                        {dayObj.text}{j < d.days.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClubDetail;
