import React from 'react';

const categories = [
  { name: 'Secondary School of the Week', count: 1 },
  { name: 'Primary School of the Week', count: 1 },
  { name: 'Youth of the Week', count: 1 },
  // { name: 'Iwo People', count: 87 },

];

const CategorySidebar = () => {
  return (
    <div className="bg-white shadow-md p-4 ">
      <div className="border-l-8 border-blue-700 pl-3 mb-4">
        <h3 style={{background: "var(--main-color-shade)", color: "white", padding: '10px 15px'}}>Categories</h3>
      </div>
      <ul style={{background: "white"}} className="space-y-3">
        {categories.map((category, idx) => (
          <li
            key={idx}
            style={{marginBottom: "10px", padding: "10px", listStyle: "none", cursor: "pointer", borderBottom: "1px solid black"}}
          >
            <span className="text-gray-800 font-medium">
              {category.name}
            </span>
            <span className="ml-1 text-gray-600">({category.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
