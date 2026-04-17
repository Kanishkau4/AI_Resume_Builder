import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";

/* ─── helpers ─────────────────────────────── */
const formatDate = (dateStr) => {
	if (!dateStr) return "";
	const [year, month] = dateStr.split("-");
	return new Date(year, month - 1).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});
};

/** Lighten the accent by mixing with white — used for pill backgrounds */
const toRgba = (hex, alpha = 0.12) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
};

/* ─── Section heading ──────────────────────── */
const H2 = ({ children, accent }) => (
	<div className="flex items-center gap-2 mb-4">
		<span
			className="inline-block w-3 h-3 rounded-sm rotate-45"
			style={{ backgroundColor: accent }}
		/>
		<h2
			className="text-[11px] font-extrabold uppercase tracking-[0.18em]"
			style={{ color: accent }}
		>
			{children}
		</h2>
	</div>
);

/* ─── Skill pill ───────────────────────────── */
const Pill = ({ label, accent }) => (
	<span
		className="px-3 py-1 rounded-full text-xs font-medium border"
		style={{
			borderColor: accent,
			color: accent,
			backgroundColor: toRgba(accent, 0.08),
		}}
	>
		{label}
	</span>
);

/* ─── Main component ────────────────────────── */
const CreativeTemplate = ({ data, accentColor }) => {
	const accent = accentColor || "#7c3aed";

	return (
		<div
			className="max-w-4xl mx-auto bg-white text-gray-800"
			style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
		>
			{/* ══ HEADER ══════════════════════════════════════════════ */}
			<header className="relative overflow-hidden px-10 pt-10 pb-8">
				{/* Decorative angled background */}
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 55%, transparent 55%)`,
					}}
				/>
				{/* Top-right accent dot cluster */}
				<div className="absolute top-0 right-0 w-40 h-40 opacity-10">
					<svg viewBox="0 0 160 160" className="w-full h-full">
						{[20, 40, 60, 80, 100, 120, 140].map((cx) =>
							[20, 40, 60, 80, 100, 120, 140].map((cy) => (
								<circle
									key={`${cx}-${cy}`}
									cx={cx}
									cy={cy}
									r="2.5"
									fill="white"
								/>
							))
						)}
					</svg>
				</div>

				<div className="relative z-10 flex items-end justify-between gap-6">
					{/* Name & title area */}
					<div>
						<h1 className="text-4xl font-black text-white leading-none tracking-tight">
							{data.personal_info?.full_name || "Your Name"}
						</h1>
						<div
							className="mt-2 h-1 w-16 rounded-full bg-white opacity-60"
						/>
					</div>

					{/* Contact chips on right */}
					<div className="flex flex-col items-end gap-1.5 text-xs font-medium text-white opacity-90">
						{data.personal_info?.email && (
							<span className="flex items-center gap-1.5">
								<Mail className="size-3 opacity-75" />
								{data.personal_info.email}
							</span>
						)}
						{data.personal_info?.phone && (
							<span className="flex items-center gap-1.5">
								<Phone className="size-3 opacity-75" />
								{data.personal_info.phone}
							</span>
						)}
						{data.personal_info?.location && (
							<span className="flex items-center gap-1.5">
								<MapPin className="size-3 opacity-75" />
								{data.personal_info.location}
							</span>
						)}
						{data.personal_info?.linkedin && (
							<a
								href={data.personal_info.linkedin}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-1.5 underline underline-offset-2"
							>
								<BsLinkedin className="size-3 opacity-75" />
								{data.personal_info.linkedin
									.replace("https://www.", "")
									.replace("https://", "")}
							</a>
						)}
						{data.personal_info?.website && (
							<a
								href={data.personal_info.website}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-1.5 underline underline-offset-2"
							>
								<Globe className="size-3 opacity-75" />
								{data.personal_info.website.replace("https://", "")}
							</a>
						)}
					</div>
				</div>
			</header>

			{/* ══ BODY — two-column grid ═══════════════════════════════ */}
			<div className="grid grid-cols-3 gap-0">
				{/* ── Left narrow column ── */}
				<div className="col-span-1 px-7 py-8 border-r border-gray-100 space-y-8">
					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<H2 accent={accent}>Skills</H2>
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, i) => (
									<Pill key={i} label={skill} accent={accent} />
								))}
							</div>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<H2 accent={accent}>Education</H2>
							<div className="space-y-5">
								{data.education.map((edu, i) => (
									<div key={i} className="break-inside-avoid">
										<p className="font-bold text-gray-900 text-sm leading-snug">
											{edu.degree}
											{edu.field ? ` — ${edu.field}` : ""}
										</p>
										<p
											className="text-xs mt-0.5 font-semibold"
											style={{ color: accent }}
										>
											{edu.institution}
										</p>
										<p className="text-xs text-gray-500 mt-0.5">
											{formatDate(edu.graduation_date)}
											{edu.gpa && ` · GPA ${edu.gpa}`}
										</p>
									</div>
								))}
							</div>
						</section>
					)}
				</div>

				{/* ── Right wide column ── */}
				<div className="col-span-2 px-8 py-8 space-y-8">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							<H2 accent={accent}>About Me</H2>
							<p className="text-gray-600 text-sm leading-relaxed">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section>
							<H2 accent={accent}>Experience</H2>
							<div className="space-y-6">
								{data.experience.map((exp, i) => (
									<div
										key={i}
										className="relative pl-5 break-inside-avoid"
										style={{
											borderLeft: `2px solid ${toRgba(accent, 0.35)}`,
										}}
									>
										{/* Dot */}
										<span
											className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
											style={{ backgroundColor: accent }}
										/>
										<div className="flex items-start justify-between gap-3">
											<div>
												<h3 className="font-bold text-gray-900 text-sm">
													{exp.position}
												</h3>
												<p
													className="text-xs font-semibold mt-0.5"
													style={{ color: accent }}
												>
													{exp.company}
												</p>
											</div>
											<span
												className="text-[10px] font-medium whitespace-nowrap px-2 py-0.5 rounded mt-0.5"
												style={{
													color: accent,
													backgroundColor: toRgba(accent, 0.1),
												}}
											>
												{formatDate(exp.start_date)} –{" "}
												{exp.is_current ? "Present" : formatDate(exp.end_date)}
											</span>
										</div>
										{exp.description && (
											<p className="text-xs text-gray-600 leading-relaxed mt-2 whitespace-pre-line">
												{exp.description}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Projects */}
					{data.projects && data.projects.length > 0 && (
						<section>
							<H2 accent={accent}>Projects</H2>
							<div className="grid grid-cols-1 gap-4">
								{data.projects.map((p, i) => (
									<div
										key={i}
										className="rounded-lg p-4 border break-inside-avoid"
										style={{
											borderColor: toRgba(accent, 0.3),
											backgroundColor: toRgba(accent, 0.04),
										}}
									>
										<h3 className="font-bold text-gray-900 text-sm">
											{p.name}
										</h3>
										{p.description && (
											<p className="text-xs text-gray-600 leading-relaxed mt-1">
												{p.description}
											</p>
										)}
										{p.link && (
											<a
												href={p.link}
												target="_blank"
												rel="noreferrer"
												className="text-[10px] mt-2 inline-block font-semibold underline underline-offset-2"
												style={{ color: accent }}
											>
												{p.link.replace("https://", "")}
											</a>
										)}
									</div>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreativeTemplate;
