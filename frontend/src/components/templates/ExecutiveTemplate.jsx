import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";

const ExecutiveTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	// Derive a dark version of the accent for the sidebar bg
	const sidebarBg = accentColor;

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 flex min-h-full" style={{ fontFamily: "'Georgia', serif" }}>
			{/* ── Sidebar ── */}
			<aside
				className="w-72 flex-shrink-0 flex flex-col"
				style={{ backgroundColor: sidebarBg, color: "#fff" }}
			>
				{/* Name block */}
				<div className="px-7 pt-10 pb-8 border-b border-white border-opacity-20">
					<h1 className="text-2xl font-bold leading-tight tracking-wide uppercase">
						{data.personal_info?.full_name || "Your Name"}
					</h1>
					<div className="mt-2 w-10 h-0.5 bg-white opacity-60" />
				</div>

				{/* Contact */}
				<div className="px-7 py-7 border-b border-white border-opacity-20 space-y-3">
					<p className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-4">
						Contact
					</p>
					{data.personal_info?.email && (
						<div className="flex items-start gap-3 text-sm opacity-90">
							<Mail className="size-3.5 mt-0.5 flex-shrink-0 opacity-70" />
							<span className="break-all">{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-3 text-sm opacity-90">
							<Phone className="size-3.5 flex-shrink-0 opacity-70" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-3 text-sm opacity-90">
							<MapPin className="size-3.5 flex-shrink-0 opacity-70" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<div className="flex items-start gap-3 text-sm opacity-90">
							<BsLinkedin className="size-3.5 mt-0.5 flex-shrink-0 opacity-70" />
							<a
								href={data.personal_info.linkedin}
								target="_blank"
								rel="noreferrer"
								className="break-all underline underline-offset-2"
							>
								{data.personal_info.linkedin
									.replace("https://www.", "")
									.replace("https://", "")}
							</a>
						</div>
					)}
					{data.personal_info?.website && (
						<div className="flex items-start gap-3 text-sm opacity-90">
							<Globe className="size-3.5 mt-0.5 flex-shrink-0 opacity-70" />
							<a
								href={data.personal_info.website}
								target="_blank"
								rel="noreferrer"
								className="break-all underline underline-offset-2"
							>
								{data.personal_info.website.replace("https://", "")}
							</a>
						</div>
					)}
				</div>

				{/* Skills */}
				{data.skills && data.skills.length > 0 && (
					<div className="px-7 py-7 border-b border-white border-opacity-20">
						<p className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-4">
							Skills
						</p>
						<ul className="space-y-2">
							{data.skills.map((skill, i) => (
								<li key={i} className="flex items-center gap-2 text-sm opacity-90">
									<span
										className="w-1.5 h-1.5 rounded-full flex-shrink-0"
										style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
									/>
									{skill}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Education */}
				{data.education && data.education.length > 0 && (
					<div className="px-7 py-7">
						<p className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-4">
							Education
						</p>
						<div className="space-y-5">
							{data.education.map((edu, i) => (
								<div key={i} className="text-sm opacity-90">
									<p className="font-semibold leading-snug">
										{edu.degree} {edu.field && `in ${edu.field}`}
									</p>
									<p className="opacity-75 mt-0.5">{edu.institution}</p>
									<p className="opacity-60 text-xs mt-1">
										{formatDate(edu.graduation_date)}
										{edu.gpa && ` · GPA ${edu.gpa}`}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</aside>

			{/* ── Main Content ── */}
			<main className="flex-1 px-10 py-10">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-9">
						<SectionTitle accentColor={accentColor} label="Professional Summary" />
						<p className="text-gray-600 leading-relaxed text-sm">
							{data.professional_summary}
						</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-9">
						<SectionTitle accentColor={accentColor} label="Experience" />
						<div className="space-y-7">
							{data.experience.map((exp, i) => (
								<div key={i} className="break-inside-avoid">
									<div className="flex items-start justify-between gap-4">
										<div>
											<h3 className="font-bold text-gray-900 text-base">
												{exp.position}
											</h3>
											<p
												className="text-sm font-semibold mt-0.5"
												style={{ color: accentColor }}
											>
												{exp.company}
											</p>
										</div>
										<span className="text-xs text-gray-500 whitespace-nowrap mt-1 px-2.5 py-1 rounded border border-gray-200 bg-gray-50">
											{formatDate(exp.start_date)} –{" "}
											{exp.is_current ? "Present" : formatDate(exp.end_date)}
										</span>
									</div>
									{exp.description && (
										<p className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-line">
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
					<section className="mb-9">
						<SectionTitle accentColor={accentColor} label="Projects" />
						<div className="space-y-5">
							{data.projects.map((p, i) => (
								<div
									key={i}
									className="pl-4 border-l-2 break-inside-avoid"
									style={{ borderColor: accentColor }}
								>
									<h3 className="font-bold text-gray-900 text-sm">{p.name}</h3>
									{p.description && (
										<p className="text-sm text-gray-600 leading-relaxed mt-1">
											{p.description}
										</p>
									)}
									{p.link && (
										<a
											href={p.link}
											target="_blank"
											rel="noreferrer"
											className="text-xs mt-1 inline-block underline underline-offset-2"
											style={{ color: accentColor }}
										>
											{p.link.replace("https://", "")}
										</a>
									)}
								</div>
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
};

/** Reusable section title with decorative rule */
const SectionTitle = ({ accentColor, label }) => (
	<div className="flex items-center gap-3 mb-5">
		<h2
			className="text-xs uppercase tracking-widest font-bold"
			style={{ color: accentColor }}
		>
			{label}
		</h2>
		<div className="flex-1 h-px bg-gray-200" />
	</div>
);

export default ExecutiveTemplate;
