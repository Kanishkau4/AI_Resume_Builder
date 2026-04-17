import { Quote } from "lucide-react";

/* ─── helpers ─────────────────────────────────────────── */
const formatDate = (dateStr) => {
	if (!dateStr) return "";
	const [year, month] = dateStr.split("-");
	return new Date(year, month - 1).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});
};

/** Resolve image src whether it's a URL string or a File object */
const resolveImage = (img) => {
	if (!img) return null;
	if (typeof img === "string") return img;
	if (typeof img === "object") {
		try {
			return URL.createObjectURL(img);
		} catch {
			return null;
		}
	}
	return null;
};

/* ─── Main component ─────────────────────────────────── */
const ModernSidebarTemplate = ({ data, accentColor }) => {
	const accent = accentColor || "#e8881e"; // default orange
	const imgSrc = resolveImage(data.personal_info?.image);

	// Split name to "first name" (thin) and "last name" (bold)
	const names = (data.personal_info?.full_name || "Your Name").split(" ");
	const firstName = names[0];
	const lastName = names.slice(1).join(" ");

	return (
		<div
			className="max-w-[1000px] mx-auto min-h-full flex relative text-gray-800"
			style={{
				fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
				backgroundColor: "#f7f7f7",
			}}
		>

			{/* ══ LEFT COLUMN ═════════════════════════════════════════ */}
			<div className="w-[35%] flex-shrink-0 relative z-0">

				{/* Accent Block */}
				<div className="pt-16 pb-24 pl-12 pr-10 rounded-br-[60px]" style={{ backgroundColor: accent, color: "white" }}>
					<Quote className="size-8 opacity-80 mb-6" fill="currentColor" stroke="none" />
					<p className="text-[13px] leading-relaxed font-medium">
						{data.professional_summary || "Write a brief objective or summary highlighting your experience and career goals."}
					</p>
				</div>

				{/* Padding block for alignment below accent */}
				<div className="px-12 py-10 space-y-10">

					{/* Contact Info */}
					<section>
						<h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-gray-900">
							Contact Info
						</h3>
						<ul className="space-y-2.5 text-[11px] font-medium text-gray-600">
							{data.personal_info?.email && (
								<li className="flex gap-4">
									<span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gray-400" />
									<span className="break-all">{data.personal_info.email}</span>
								</li>
							)}
							{data.personal_info?.phone && (
								<li className="flex gap-4">
									<span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gray-400" />
									<span>{data.personal_info.phone}</span>
								</li>
							)}
							{data.personal_info?.linkedin && (
								<li className="flex gap-4">
									<span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gray-400" />
									<span>{data.personal_info.linkedin}</span>
								</li>
							)}
							{data.personal_info?.website && (
								<li className="flex gap-4">
									<span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gray-400" />
									<span className="break-all">{data.personal_info.website}</span>
								</li>
							)}
						</ul>
					</section>

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-gray-900">
								Education
							</h3>
							<div className="space-y-5">
								{data.education.map((edu, i) => (
									<div key={i} className="break-inside-avoid">
										<p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mb-1">
											{edu.start_date && `${formatDate(edu.start_date)} – `}
											{formatDate(edu.graduation_date) || "Present"}
										</p>
										<p className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-0.5">
											{edu.degree}
										</p>
										<p className="text-[11px] text-gray-600">
											{edu.institution}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-gray-900">
								Skills
							</h3>
							<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
								Professional
							</p>
							<ul className="space-y-2.5 text-[11px] font-medium text-gray-600">
								{data.skills.map((skill, i) => (
									<li key={i} className="flex gap-4 items-center">
										<span className="w-1 h-1 rounded-full flex-shrink-0 bg-gray-400" />
										<span>{skill}</span>
									</li>
								))}
							</ul>
						</section>
					)}
				</div>
			</div>

			{/* ══ RIGHT COLUMN ═════════════════════════════════════════ */}
			<div className="w-[65%] flex-1 pl-20 pr-12 pt-16 pb-12 relative z-10">

				{/* Profile Image */}
				{imgSrc && (
					<div
						className="w-32 h-32 rounded-full overflow-hidden mb-5 shadow-sm -ml-10 -mt-3"
						style={{
							backgroundColor: accent
						}}
					>
						<img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
					</div>
				)}
				{!imgSrc && (
					<div
						className="w-32 h-32 rounded-full overflow-hidden shadow-sm flex items-center justify-center text-4xl font-black -ml-10"
						style={{
							backgroundColor: accent,
							color: "white"
						}}
					>
						{(data.personal_info?.full_name || "YN")
							.split(" ")
							.map((n) => n[0])
							.slice(0, 2)
							.join("")
							.toUpperCase()}
					</div>
				)}

				{/* Name Block */}
				<header className="mb-14">
					<h1 className="text-[44px] leading-[1.1] tracking-[0.25em] uppercase mb-4 text-gray-900">
						<span className="font-light block">{firstName}</span>
						{lastName && <span className="font-bold block">{lastName}</span>}
					</h1>
					<div className="text-sm font-semibold text-gray-600 space-y-1">
						<p>{data.personal_info?.profession || "Profession"}</p>
						{(data.personal_info?.location || data.personal_info?.email) && (
							<p>based in {data.personal_info?.location || "Unknown"}</p>
						)}
					</div>
				</header>

				{/* Experience Block */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-10">
						<h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-gray-900">
							Experience
						</h3>

						{/* Vertical line indicator */}
						<div className="relative border-l border-gray-300 pl-8 ml-1 space-y-10">
							{data.experience.map((exp, i) => (
								<div key={i} className="break-inside-avoid relative">
									{/* Subtle horizontal tick mark on the timeline */}
									<div className="absolute -left-[33px] top-1.5 w-4 h-px bg-gray-300" />

									<p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2">
										{formatDate(exp.start_date)} –{" "}
										{exp.is_current ? "Current" : formatDate(exp.end_date)}
									</p>
									<h4 className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-900 mb-3">
										{exp.position} — {exp.company}
									</h4>
									{exp.description && (
										<div className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line">
											{exp.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects / Extras (just appending to bottom gracefully) */}
				{data.projects && data.projects.length > 0 && (
					<section>
						<h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-gray-900">
							Projects
						</h3>
						<div className="relative border-l border-gray-300 pl-8 ml-1 space-y-8">
							{data.projects.map((p, i) => (
								<div key={i} className="break-inside-avoid relative">
									<div className="absolute -left-[33px] top-1.5 w-4 h-px bg-gray-300" />
									<h4 className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-900 mb-2">
										{p.name}
									</h4>
									{p.description && (
										<div className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line mb-2">
											{p.description}
										</div>
									)}
									{p.link && (
										<a
											href={p.link}
											target="_blank"
											rel="noreferrer"
											className="text-[10px] uppercase tracking-widest text-blue-600 font-bold"
										>
											View Project
										</a>
									)}
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default ModernSidebarTemplate;
