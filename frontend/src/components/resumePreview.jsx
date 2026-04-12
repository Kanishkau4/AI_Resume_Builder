import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

function ResumePreview({ data, template, accentColor, classes = "" }) {

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className='w-full bg-slate-100'>
            <div id='resume-preview' className={`print:shadow-none print:border-none shadow-sm border border-slate-200` + classes}>
                {renderTemplate()}
            </div>
            <style>
                {`
                @page {
                    size: A4;
                    margin: 0;
                }
                @media print {
                    html, body {
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default ResumePreview