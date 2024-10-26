import PageHeader from '@/components/PageHeader';

const PAGE_WIDTH = 108; // mm
const PAGE_HEIGHT = 175; // mm

export default function Home() {
  return (
    <div className="bg-[#EBECF0] min-h-screen p-4 flex flex-col items-center">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((row) => (
        <div key={row} className="flex space-x-4 mb-4">
          {[1, 2].map((col) => {
            const pageNumber = row * 2 + col;
            return (
              <div key={pageNumber} className="relative">
                <PageHeader pageNumber={pageNumber} />
                <div 
                  className="bg-white shadow-lg rounded-md overflow-hidden relative mt-10"
                  style={{ 
                    width: `${PAGE_WIDTH}mm`, 
                    height: `${PAGE_HEIGHT}mm`,
                  }}
                >
                  {/* Canvas content will go here */}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  )
}
