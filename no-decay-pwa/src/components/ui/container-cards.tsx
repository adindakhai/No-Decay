import { StatusCard } from './status-card'

const containers = [
  {
    type: 'fresh',
    containerNumber: 'Container 01',
    imageUrl: '/image/containerhome.svg'
  },
  {
    type: 'spoiled',
    containerNumber: 'Container 01',
    imageUrl: '/image/containerhome.svg'
  },
  {
    type: 'warning',
    containerNumber: 'Container 01',
    imageUrl: '/image/containerhome.svg'
  }
] as const

export default function ContainerCards() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {containers.map((container, index) => (
        <StatusCard
          key={`${container.type}-${index}`}
          type={container.type}
          containerNumber={container.containerNumber}
          imageUrl={container.imageUrl}
        />
      ))}
    </div>
  )
}
