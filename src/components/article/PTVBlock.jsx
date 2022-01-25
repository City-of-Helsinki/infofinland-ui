import Block from '@/components/layout/Block'

export default function PTVBlock({ items }) {
  return (
    <div className="mb-16">
      {items.map(
        ({
          field_email_address,
          field_phonenumber,
          field_postal_address,
          field_postal_address_additional,
          field_service_hours,
          field_visiting_address,
          field_visiting_address_additional,
          title,
          id,
        }) => (
          <Block key={`pvt-${id}`} className="mb-8">
            {/* potential low impact Accessibility issue with H4. Needs H3 to preceed it.
            Possible solution is to use H3 as H2 is most likely present before contact block
            */}
            {title && <h4 className="mb-4 text-h4 font-bold">{title}</h4>}

            {field_visiting_address && (
              <p className="">
                {field_visiting_address}

                {field_visiting_address_additional && (
                  <>
                    <br />
                    {field_visiting_address_additional}
                  </>
                )}
              </p>
            )}

            {field_postal_address && (
              <p className="mb-2">
                {field_postal_address}

                {field_postal_address_additional && (
                  <>
                    <br />
                    {field_postal_address_additional}
                  </>
                )}
              </p>
            )}

            {field_phonenumber &&
              field_phonenumber.map((phone) => (
                <p className="" key={`phone-${id}-${phone}`}>
                  {phone}
                </p>
              ))}

            {field_email_address && (
              <p className="mb-4">{field_email_address}</p>
            )}

            {field_service_hours && <p className="">{field_service_hours}</p>}
          </Block>
        )
      )}
    </div>
  )
}
