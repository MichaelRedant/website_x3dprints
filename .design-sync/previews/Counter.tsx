import { Counter } from 'x3dprints'

const wrap = (label: string, children: React.ReactNode) => (
  <div style={{ textAlign: 'center', padding: '8px 16px' }}>
    <div style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1, color: '#111827' }}>
      {children}
    </div>
    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', fontFamily: 'system-ui' }}>
      {label}
    </div>
  </div>
)

export function Count() {
  return wrap('orders delivered', <Counter to={1234} duration={0} />)
}

export function WithSuffix() {
  return wrap('lead time', <Counter to={48} duration={0} suffix=" h" />)
}

export function WithDecimals() {
  return wrap('satisfaction', <Counter to={99.7} duration={0} decimals={1} suffix="%" locale="nl-BE" />)
}

export function WithPrefix() {
  return wrap('tolerance', <Counter to={2} duration={0} prefix="±" suffix=" mm" />)
}
