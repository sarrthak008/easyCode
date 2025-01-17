import React from 'react'

const CourseSkelleton = () => {
  return (
    <div class="w-[350px] h-[500px] p-4 m-10 mx-auto border-1 border-gray-900 bg-gray-800 rounded-md shadow max-h-md">
    <div class="flex space-x-4 animate-pulse">
        <div class="flex-1 py-1 space-y-4">
            <div class="w-full h-44 bg-gray-600 rounded"></div>
            <div class="">
                <div class="h-9 bg-gray-600 rounded"></div>
            </div>
            <div class="space-y-2 mt-12">
                <div class="h-9 bg-gray-600 rounded my-[10%]"></div>
                <div class="h-12 w-[80%] bg-gray-600 rounded mt-[20%]"></div>
                <div class="h-12 w-[80%] bg-gray-600 rounded "></div>
            </div>
        </div>
    </div>
 </div>
  )
}

export {CourseSkelleton}