import React from 'react'

const CourseSkelleton = () => {
  return (
    <div className="w-[350px] h-[500px] p-4 m-10 mx-auto border-1 border-gray-900 bg-gray-800 rounded-md shadow max-h-md">
    <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-4">
            <div className="w-full h-44 bg-gray-600 rounded"></div>
            <div className="">
                <div className="h-9 bg-gray-600 rounded"></div>
            </div>
            <div class="space-y-2 mt-12">
                <div className="h-9 bg-gray-600 rounded my-[10%]"></div>
                <div className="h-12 w-[80%] bg-gray-600 rounded mt-[20%]"></div>
                <div className="h-12 w-[80%] bg-gray-600 rounded "></div>
            </div>
        </div>
    </div>
 </div>
  )
}

export {CourseSkelleton}