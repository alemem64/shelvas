import PageHeader from '@/components/PageHeader';


export default function Home() {
  return (
    <div className="bg-[#EBECF0] min-h-screen p-4 flex justify-center items-center">
      <div className="flex space-x-4 w-full max-w-7xl">
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" style={{ aspectRatio: '1 / 1.414' }}>
            <PageHeader pageNumber={247} />
            <div className="h-full bg-white p-8 overflow-auto">
              <p className="text-gray-700 leading-relaxed">
                The ancient Victorian mansion creaked and groaned under the relentless assault of the howling wind, its weathered timbers protesting against the storm's fury. Sarah huddled deeper into her threadbare blanket, pulling it tighter around her trembling shoulders as she fixed her gaze on the guttering candle before her. Consider adding more sensory details here. What does Sarah hear besides the wind? Any particular smells in the air? This could enhance the eerie atmosphere.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" style={{ aspectRatio: '1 / 1.414' }}>
            <PageHeader pageNumber={248} />
            <div className="h-full bg-white p-8 overflow-auto">
              <p className="text-gray-700 leading-relaxed">
                The metal was ice-cold against Sarah's clammy skin, sending a shiver down her spine that seemed to resonate through her very bones. With agonizing slowness, she turned the knob and pushed the door open, wincing at the prolonged creak that emanated from the rusted hinges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
