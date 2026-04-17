import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";

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

/** Slightly darkened hex for gradient stop */
const darken = (hex, amount = 30) => {
	let r = parseInt(hex.slice(1, 3), 16);
	let g = parseInt(hex.slice(3, 5), 16);
	let b = parseInt(hex.slice(5, 7), 16);
	r = Math.max(0, r - amount);
	g = Math.max(0, g - amount);
	b = Math.max(0, b - amount);
	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

/** Translucent version of the accent */
const alpha = (hex, a = 0.12) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${a})`;
};

/* ─── Section heading ─────────────────────────────────── */
const SectionHeading = ({ title, accent }) => (
	<div className="flex items-center gap-3 mb-5">
		<div
			className="h-5 w-1 rounded-full"
			style={{ backgroundColor: accent }}
		/>
		<h2
			className="text-[10px] font-black uppercase tracking-[0.2em]"
			style={{ color: accent }}
		>
			{title}
		</h2>
		<div className="flex-1 h-px" style={{ backgroundColor: alpha(accent, 0.25) }} />
	</div>
);

/* ─── Main component ─────────────────────────────────── */
const EleganceTemplate = ({ data, accentColor }) => {
	const accent = accentColor || "#1e40af";
	const imgSrc = resolveImage(data.personal_info?.image);

	return (
		<div
			className="max-w-4xl mx-auto bg-white text-gray-800"
			style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
		>
			{/* ══ HEADER ════════════════════════════════════════════ */}
			<header
				className="relative px-10 py-9 overflow-hidden"
				style={{
					background: `linear-gradient(120deg, ${darken(accent, 40)} 0%, ${accent} 60%, ${darken(accent, -15)} 100%)`,
				}}
			>
				{/* Decorative rings */}
				<div
					className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-2 opacity-10"
					style={{ borderColor: "#fff" }}
				/>
				<div
					className="absolute -top-8 -right-8 w-36 h-36 rounded-full border-2 opacity-10"
					style={{ borderColor: "#fff" }}
				/>

				<div className="relative z-10 flex items-center gap-8">
					{/* Profile photo */}
					<div className="flex-shrink-0">
						{imgSrc ? (
							<img
								src={imgSrc}
								alt="Profile"
								className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
								style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
							/>
						) : (
							/* Placeholder initials avatar */
							<div
								className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold shadow-lg"
								style={{
									backgroundColor: alpha(accent, 0.3),
									color: "#fff",
									boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
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
					</div>

					{/* Name & contact */}
					<div className="flex-1 text-white">
						<h1 className="text-3xl font-black tracking-tight leading-none">
							{data.personal_info?.full_name || "Your Name"}
						</h1>
						{data.personal_info?.profession && (
							<p className="mt-1 text-sm font-medium opacity-80 tracking-wider uppercase">
								{data.personal_info.profession}
							</p>
						)}

						<div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
							{data.personal_info?.email && (
								<span className="flex items-center gap-1.5 text-xs opacity-90">
									<Mail className="size-3 opacity-70" />
									{data.personal_info.email}
								</span>
							)}
							{data.personal_info?.phone && (
								<span className="flex items-center gap-1.5 text-xs opacity-90">
									<Phone className="size-3 opacity-70" />
									{data.personal_info.phone}
								</span>
							)}
							{data.personal_info?.location && (
								<span className="flex items-center gap-1.5 text-xs opacity-90">
									<MapPin className="size-3 opacity-70" />
									{data.personal_info.location}
								</span>
							)}
							{data.personal_info?.linkedin && (
								<a
									href={data.personal_info.linkedin}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-1.5 text-xs opacity-90 underline underline-offset-2"
								>
									<BsLinkedin className="size-3 opacity-70" />
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
									className="flex items-center gap-1.5 text-xs opacity-90 underline underline-offset-2"
								>
									<Globe className="size-3 opacity-70" />
									{data.personal_info.website.replace("https://", "")}
								</a>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* ══ BODY ═══════════════════════════════════════════════ */}
			<div className="grid grid-cols-3 gap-0">

				{/* ── LEFT SIDEBAR ── */}
				<aside
					className="col-span-1 px-6 py-8 space-y-7 border-r"
					style={{ borderColor: alpha(accent, 0.15), backgroundColor: alpha(accent, 0.03) }}
				>
					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<SectionHeading title="Skills" accent={accent} />
							<ul className="space-y-2">
								{data.skills.map((skill, i) => (
									<li key={i} className="flex items-center gap-2 text-sm text-gray-700">
										<span
											className="w-1.5 h-1.5 rounded-full flex-shrink-0"
											style={{ backgroundColor: accent }}
										/>
										{skill}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<SectionHeading title="Education" accent={accent} />
							<div className="space-y-5">
								{data.education.map((edu, i) => (
									<div key={i} className="break-inside-avoid">
										<p className="text-sm font-bold text-gray-900 leading-snug">
											{edu.degree}
											{edu.field ? ` in ${edu.field}` : ""}
										</p>
										<p
											className="text-xs font-semibold mt-0.5"
											style={{ color: accent }}
										>
											{edu.institution}
										</p>
										<p className="text-[11px] text-gray-500 mt-0.5">
											{formatDate(edu.graduation_date)}
											{edu.gpa && ` · GPA ${edu.gpa}`}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Languages / extra info placeholder */}
					{data.personal_info?.linkedin && (
						<section>
							<SectionHeading title="Links" accent={accent} />
							<div className="space-y-2 text-xs text-gray-600">
								{data.personal_info.linkedin && (
									<a
										href={data.personal_info.linkedin}
										target="_blank"
										rel="noreferrer"
										className="flex items-start gap-2 underline underline-offset-2 break-all"
										style={{ color: accent }}
									>
										<BsLinkedin className="size-3 mt-0.5 flex-shrink-0" />
										{data.personal_info.linkedin
											.replace("https://www.", "")
											.replace("https://", "")}
									</a>
								)}
								{data.personal_info.website && (
									<a
										href={data.personal_info.website}
										target="_blank"
										rel="noreferrer"
										className="flex items-start gap-2 underline underline-offset-2 break-all"
										style={{ color: accent }}
									>
										<Globe className="size-3 mt-0.5 flex-shrink-0" />
										{data.personal_info.website.replace("https://", "")}
									</a>
								)}
							</div>
						</section>
					)}
				</aside>

				{/* ── MAIN CONTENT ── */}
				<main className="col-span-2 px-9 py-8 space-y-8">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							<SectionHeading title="About Me" accent={accent} />
							<p className="text-sm text-gray-600 leading-relaxed">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section>
							<SectionHeading title="Experience" accent={accent} />
							<div className="space-y-6">
								{data.experience.map((exp, i) => (
									<div key={i} className="break-inside-avoid">
										<div className="flex items-start justify-between gap-3">
											<div>
												<h3 className="text-sm font-bold text-gray-900">
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
												className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
												style={{
													color: accent,
													backgroundColor: alpha(accent, 0.1),
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
										{/* Subtle separator */}
										{i < data.experience.length - 1 && (
											<div
												className="mt-4 h-px"
												style={{ backgroundColor: alpha(accent, 0.15) }}
											/>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Projects */}
					{data.projects && data.projects.length > 0 && (
						<section>
							<SectionHeading title="Projects" accent={accent} />
							<div className="space-y-4">
								{data.projects.map((p, i) => (
									<div
										key={i}
										className="rounded-xl p-4 border break-inside-avoid"
										style={{
											borderColor: alpha(accent, 0.25),
											backgroundColor: alpha(accent, 0.04),
										}}
									>
										<div className="flex items-start justify-between gap-2">
											<h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
											{p.link && (
												<a
													href={p.link}
													target="_blank"
													rel="noreferrer"
													className="text-[10px] font-semibold underline underline-offset-2 whitespace-nowrap"
													style={{ color: accent }}
												>
													View →
												</a>
											)}
										</div>
										{p.description && (
											<p className="text-xs text-gray-600 leading-relaxed mt-1">
												{p.description}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}
				</main>
			</div>
		</div>
	);
};

export default EleganceTemplate;
