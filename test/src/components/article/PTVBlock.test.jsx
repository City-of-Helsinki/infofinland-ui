/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import PVTBlock from '@/components/article/PTVBlock'

const ITEMS = [
  {
    field_email_address: 'aa@bb.com',
    field_phonenumber: ['+358 044 676 9539'],
    field_postal_address: 'Osoite 1 A',
    field_postal_address_additional: 'Kolmas kerros',
    field_service_hours: 'ma-pe: 10-16, la:12-14',
    field_visiting_address: 'Isompi tie 2',
    field_visiting_address_additional: 'Pääovi',
    title: 'Testitiedot',
    id: 'getegeh5g',
  },
  {},
]
describe('Block', () => {
  it('should render the given contact fragments inside a Block', () => {
    const { asFragment } = render(<PVTBlock items={ITEMS} className="tester" />)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
