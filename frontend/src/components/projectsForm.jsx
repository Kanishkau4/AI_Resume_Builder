import React from 'react'
import { Plus, Trash2, Folder } from 'lucide-react'

function ProjectsForm({ data, onChange }) {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        }
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updatedProject = data.filter((_, i) => i !== index)
        onChange(updatedProject)
    }

    const updateProject = (index, field, value) => {
        const updatedProject = [...data]
        updatedProject[index][field] = value
        onChange(updatedProject)
    }

    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <div className='text-xl font-semibold text-slate-800'>
                    <h3 className='flex items-center text-lg font-semibold text-slate-800'>Projects</h3>
                    <p className='text-sm text-slate-500'>Add your projects</p>
                </div>
                <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-sm text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'>
                    <Plus className='size-4 mr-2' />
                    <p className='text-sm'>Add Project</p>
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-10 text-slate-500'>
                    <Folder className='size-12 mx-auto mb-2 text-emerald-300' />
                    <p>No projects added yet</p>
                    <p className='text-sm text-slate-500'>Click the button above to add your first project</p>
                </div>
            ) : (
                <div className='mt-6'>
                    {data.map((project, index) => (
                        <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg font-semibold text-slate-800'>Project {index + 1}</h3>
                                <button onClick={() => removeProject(index)} className='flex items-center gap-2 px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                                    <Trash2 className='size-4 mr-2' />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={project.name || ''} onChange={(e) => updateProject(index, 'name', e.target.value)} placeholder='Project Name' />
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={project.type || ''} onChange={(e) => updateProject(index, 'type', e.target.value)} placeholder='Project Type (optional)' />
                            </div>
                            <textarea className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={project.description || ''} onChange={(e) => updateProject(index, 'description', e.target.value)} placeholder='Add a description of your project...' rows={5} />
                            <hr className='border-slate-200 mt-4 mb-4' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectsForm