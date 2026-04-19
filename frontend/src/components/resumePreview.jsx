import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import EleganceTemplate from './templates/EleganceTemplate'
import ModernSidebarTemplate from './templates/ModernSidebarTemplate'

function ResumePreview({ data, template, accentColor, classes = "" }) {

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />
            case 'executive':
                return <ExecutiveTemplate data={data} accentColor={accentColor} />
            case 'creative':
                return <CreativeTemplate data={data} accentColor={accentColor} />
            case 'elegance':
                return <EleganceTemplate data={data} accentColor={accentColor} />
            case 'modern-sidebar':
                return <ModernSidebarTemplate data={data} accentColor={accentColor} />
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className='w-full bg-slate-100 print:bg-white'>
            <div id='resume-preview' className={`print:shadow-none print:border-none shadow-sm border border-slate-200 bg-white print:w-[210mm] print:mx-auto ` + classes}>
                {renderTemplate()}
            </div>
            <style>
                {`
                @page {
                    size: A4;
                    margin: 0mm;
                }
                @media print {
                    body {
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Ensure text is selectable and sharp */
                    #resume-preview {
                        box-shadow: none !important;
                        border: none !important;
                        width: 210mm !important;
                        min-height: 297mm !important;
                        position: relative !important;
                        left: 0 !important;
                        top: 0 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    /* Hide unnecessary elements if any overlap */
                    .print-hidden {
                        display: none !important;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default ResumePreview