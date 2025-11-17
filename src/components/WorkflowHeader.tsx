import exampleImage from 'figma:asset/eddee842edbe73d0a3a6c32018333ea6c5fbb792.png';

export function WorkflowHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L8 12L20 19L32 12L20 5Z" fill="#4F46E5" />
              <path d="M8 18L20 25L32 18" stroke="#4F46E5" strokeWidth="2" />
              <path d="M8 24L20 31L32 24" stroke="#4F46E5" strokeWidth="2" />
            </svg>
            <div>
              <h1>Hidden Brains</h1>
              <p className="text-sm text-gray-600">Discover Possibilities</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Prepared for Grupo TYT</p>
            <p>Finished Vehicle Logistics Workflow</p>
            <p className="text-sm text-gray-600">Version: 1.0</p>
          </div>
        </div>
      </div>
    </header>
  );
}
