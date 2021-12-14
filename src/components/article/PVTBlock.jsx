import Block from '@/components/layout/Block'

export default function PVTBlock({
  field_email_address,
  field_phonenumber,
  field_postal_address,
  field_postal_address_additional,
  field_service_hours,
  field_visiting_address,
  field_visiting_address_additional,
  title,
}) {
  return (
    <Block>
      {title && <h4 className="mb-4 text-h4 font-bold">{title}</h4>}

      {field_visiting_address && (
        <p className="mb-4">{field_visiting_address}</p>
      )}

      {field_visiting_address_additional && (
        <p className="mb-4">{field_visiting_address_additional}</p>
      )}

      {field_postal_address && <p className="mb-4">{field_postal_address}</p>}

      {field_postal_address_additional && (
        <p className="mb-4">{field_postal_address_additional}</p>
      )}

      {field_service_hours && <p className="mb-4">{field_service_hours}</p>}

      {field_phonenumber && <p className="mb-4">{field_phonenumber}</p>}

      {field_email_address && <p className="mb-4">{field_email_address}</p>}
    </Block>
  )
}
