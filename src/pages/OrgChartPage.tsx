import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

interface OrgNode {
  id: string
  title: string
  person: string
  type: 'board' | 'executive' | 'director' | 'department' | 'unit'
  children?: OrgNode[]
}

const orgTree: OrgNode = {
  id: 'board',
  title: 'Board of Directors',
  person: '[Board Chairperson]',
  type: 'board',
  children: [
    {
      id: 'admin',
      title: 'Hospital Administrator',
      person: '[Hospital Administrator]',
      type: 'executive',
      children: [
        {
          id: 'meddir',
          title: 'Medical Director',
          person: '[Medical Director]',
          type: 'director',
          children: [
            { id: 'er', title: 'Emergency Room', person: '[ER Head]', type: 'department' },
            { id: 'opd', title: 'Outpatient Dept.', person: '[OPD Head]', type: 'department' },
            { id: 'inpatient', title: 'Inpatient Dept.', person: '[Inpatient Head]', type: 'department' },
            { id: 'surgical', title: 'Surgery', person: '[Surgical Head]', type: 'department' },
          ],
        },
        {
          id: 'nursing',
          title: 'Chief Nurse',
          person: '[Chief Nurse]',
          type: 'director',
          children: [
            { id: 'wards', title: 'Ward Nurses', person: 'Nursing Staff', type: 'unit' },
            { id: 'maternal-n', title: 'Maternal Ward', person: '[Ward Head]', type: 'unit' },
          ],
        },
        {
          id: 'operations',
          title: 'Operations Manager',
          person: '[Operations Manager]',
          type: 'director',
          children: [
            { id: 'lab', title: 'Laboratory', person: '[Lab Head]', type: 'department' },
            { id: 'radiology', title: 'Radiology', person: '[Radiology Head]', type: 'department' },
            { id: 'pharmacy', title: 'Pharmacy', person: '[Chief Pharmacist]', type: 'department' },
            { id: 'records', title: 'Medical Records', person: '[Records Head]', type: 'department' },
          ],
        },
        {
          id: 'finance-dir',
          title: 'Finance & Admin Officer',
          person: '[Finance Officer]',
          type: 'director',
          children: [
            { id: 'finance', title: 'Finance & Billing', person: '[Finance Head]', type: 'department' },
            { id: 'hr', title: 'Human Resources', person: '[HR Head]', type: 'department' },
            { id: 'housekeeping', title: 'Housekeeping', person: '[HK Head]', type: 'unit' },
            { id: 'maintenance', title: 'Maintenance', person: '[Maint. Head]', type: 'unit' },
          ],
        },
      ],
    },
  ],
}

const nodeColors: Record<OrgNode['type'], { bg: string; text: string; border: string; personColor: string }> = {
  board: { bg: '#081729', text: '#ffffff', border: '#081729', personColor: '#7fe3e0' },
  executive: { bg: '#0d2240', text: '#ffffff', border: '#0d2240', personColor: '#7fe3e0' },
  director: { bg: '#1a7f7a', text: '#ffffff', border: '#1a7f7a', personColor: 'rgba(255,255,255,0.75)' },
  department: { bg: '#ffffff', text: '#0d2240', border: '#d1eeec', personColor: '#6b7280' },
  unit: { bg: '#f5f7f9', text: '#374151', border: '#e5e7eb', personColor: '#9ca3af' },
}

function ChartNode({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const colors = nodeColors[node.type]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: '3px',
          padding: '10px 14px',
          minWidth: isRoot ? '200px' : '130px',
          maxWidth: '180px',
          textAlign: 'center',
          cursor: hasChildren ? 'pointer' : 'default',
          boxShadow: isRoot ? '0 2px 12px rgba(13,34,64,0.18)' : '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.15s, transform 0.1s',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          if (hasChildren) {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(13,34,64,0.2)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isRoot ? '0 2px 12px rgba(13,34,64,0.18)' : '0 1px 4px rgba(0,0,0,0.06)'
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            lineHeight: 1.35,
            marginBottom: '4px',
          }}
        >
          {node.title}
        </div>
        <div style={{ fontSize: '10px', color: colors.personColor, lineHeight: 1.3 }}>{node.person}</div>
        {hasChildren && (
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#1a7f7a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '8px',
              fontWeight: 700,
              zIndex: 1,
              border: '1px solid #ffffff',
            }}
          >
            {open ? '−' : '+'}
          </div>
        )}
      </button>

      {hasChildren && open && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Vertical stem */}
          <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />

          {/* Children row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', position: 'relative' }}>
            {node.children!.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: `calc(100% - 80px)`,
                  height: '1px',
                  backgroundColor: '#d1d5db',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
            {node.children!.map((child) => (
              <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db' }} />
                <ChartNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ListNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const colors = nodeColors[node.type]

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: `10px 16px 10px ${16 + depth * 24}px`,
          border: 'none',
          borderBottom: '1px solid #f3f4f6',
          backgroundColor: open && hasChildren ? '#fafbfc' : 'transparent',
          cursor: hasChildren ? 'pointer' : 'default',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => {
          if (hasChildren) e.currentTarget.style.backgroundColor = '#f5f7f9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = open && hasChildren ? '#fafbfc' : 'transparent'
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: colors.bg === '#ffffff' || colors.bg === '#f5f7f9' ? '#1a7f7a' : colors.bg,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0d2240', lineHeight: 1.3 }}>
            {node.title}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>{node.person}</div>
        </div>
        {hasChildren && (
          <div style={{ color: '#9ca3af', fontSize: '12px', flexShrink: 0 }}>
            {open ? '▾' : '▸'}
          </div>
        )}
      </button>
      {hasChildren && open && (
        <div>
          {node.children!.map((child) => (
            <ListNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrgChartPage({ navigate }: Props) {
  const [view, setView] = useState<'chart' | 'list'>('chart')

  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ backgroundColor: '#0d2240', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7fe3e0',
              marginBottom: '12px',
            }}
          >
            How We're Organized
          </div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              color: '#ffffff',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            Organizational Structure
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px' }}>
            Leyte Baptist Hospital is organized to deliver coordinated, accountable, and efficient
            healthcare across all departments and service units.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* View toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {(['chart', 'list'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 500,
                border: '1px solid',
                borderColor: view === v ? '#0d2240' : '#e5e7eb',
                borderRadius: '6px',
                backgroundColor: view === v ? '#0d2240' : '#ffffff',
                color: view === v ? '#ffffff' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {v === 'chart' ? '⬢  Chart View' : '≡  List View'}
            </button>
          ))}
          <span style={{ color: '#9ca3af', fontSize: '12px', marginLeft: '8px' }}>
            Click on nodes to expand or collapse
          </span>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '4px',
          }}
        >
          {(
            [
              { type: 'board', label: 'Governing Board' },
              { type: 'executive', label: 'Executive Leadership' },
              { type: 'director', label: 'Directors / Heads' },
              { type: 'department', label: 'Departments' },
              { type: 'unit', label: 'Units / Staff' },
            ] as { type: OrgNode['type']; label: string }[]
          ).map((item) => (
            <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor:
                    nodeColors[item.type].bg === '#ffffff' || nodeColors[item.type].bg === '#f5f7f9'
                      ? '#e5e7eb'
                      : nodeColors[item.type].bg,
                  border: `1px solid ${nodeColors[item.type].border}`,
                }}
              />
              <span style={{ fontSize: '12px', color: '#4b5563' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {view === 'chart' ? (
          <div
            style={{
              overflowX: 'auto',
              overflowY: 'visible',
              paddingBottom: '40px',
            }}
          >
            <div
              style={{
                minWidth: 'max-content',
                display: 'flex',
                justifyContent: 'center',
                padding: '24px 40px',
              }}
            >
              <ChartNode node={orgTree} isRoot />
            </div>
          </div>
        ) : (
          <div
            style={{
              border: '1px solid #f3f4f6',
              borderRadius: '4px',
              overflow: 'hidden',
              maxWidth: '680px',
            }}
          >
            <ListNode node={orgTree} depth={0} />
          </div>
        )}

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#f5f7f9',
            borderRadius: '2px',
            fontSize: '12px',
            color: '#9ca3af',
            lineHeight: 1.7,
            borderTop: '1px solid #e5e7eb',
          }}
        >
          Note: Organizational structure and personnel information is maintained through the hospital
          administration system. Placeholder names are shown and will be updated by authorized
          administrators through the CMS backend.
        </div>
      </div>
    </div>
  )
}
