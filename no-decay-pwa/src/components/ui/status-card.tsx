import Image from 'next/image'

type StatusType = 'fresh' | 'spoiled' | 'warning'

interface StatusCardProps {
  type: StatusType
  containerNumber: string
  imageUrl: string
}

const statusConfig = {
  fresh: {
    background: '#115437',
    label: 'FRESH',
    icon: '😊'
  },
  spoiled: {
    background: '#BF0000',
    label: 'SPOILED',
    icon: '☹️'
  },
  warning: {
    background: '#E15B02',
    label: 'WARNING',
    icon: '😐'
  }
}

export function StatusCard({ type, containerNumber, imageUrl }: StatusCardProps) {
  const config = statusConfig[type]

  return (
    <div 
      className="relative w-[236px] h-[252px] flex-none"
      style={{ order: type === 'fresh' ? 0 : type === 'spoiled' ? 1 : 2 }}
    >
      <div
        className="absolute w-[236px] h-[238px] left-0 top-0 rounded-[12px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)]"
        style={{ background: config.background }}
      >
        <div className="absolute left-[23px] top-[23px]">
          <h3 className="font-inter font-bold text-[20px] leading-[145%] text-[#FEF3E2]">
            {containerNumber}
          </h3>
        </div>

        <div className="absolute right-[23px] top-[17px] w-[42px] h-[42px] flex items-center justify-center">
          <span className="text-[32px]">{config.icon}</span>
        </div>

        <div className="absolute left-[23px] top-[48px]">
          <h2 className="font-inter font-bold text-[32px] leading-[145%] text-[#FEF3E2]">
            {config.label}
          </h2>
        </div>

        <div className="absolute left-[17px] top-[96px] w-[201px] h-[142.2px]">
          <Image
            src={imageUrl}
            alt={`Container ${containerNumber} status`}
            width={201}
            height={142}
            className="drop-shadow-[0px_4px_19.1px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </div>
  )
} 