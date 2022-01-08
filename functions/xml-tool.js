var convert = require('xml-js');
//import xmlFile from './xml/xmlBase.xml'
const xmlFile = 
'<?xml version="1.0" encoding="ISO-8859-15"?>' +
'<?xml-stylesheet href="Finvoice.xsl" type="text/xsl"?>' + 
'<Finvoice Version="3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="Finvoice3.0.xsd">'+
'  <BuyerPartyDetails>'+
'	<BuyerPartyIdentifier>69420</BuyerPartyIdentifier>'+
'    <BuyerOrganisationName>BOTTI-KAYTTAJA</BuyerOrganisationName>'+
'    <BuyerOrganisationTaxCode>FILL_IN</BuyerOrganisationTaxCode>'+
'    <BuyerPostalAddressDetails>'+
'      <BuyerStreetName>FILL_IN</BuyerStreetName>'+
'      <BuyerTownName>FILL_IN</BuyerTownName>'+
'      <BuyerPostCodeIdentifier>FILL_IN</BuyerPostCodeIdentifier>'+
'	  <CountryCode>FI</CountryCode>'+
'      <CountryName>Suomi</CountryName>'+
'    </BuyerPostalAddressDetails>'+
'  </BuyerPartyDetails >'+
'  <DeliveryDetails>'+
'    <DeliveryDate Format="CCYYMMDD">FILL_IN</DeliveryDate>'+
'  </DeliveryDetails>'+
'  <InvoiceDetails>'+
'    <InvoiceTypeCode>INV01</InvoiceTypeCode>'+
'    <InvoiceTypeCodeUN>380</InvoiceTypeCodeUN>'+
'    <InvoiceTypeText>Invoice</InvoiceTypeText>  '+
'    <OriginCode>Original</OriginCode>'+
'    <InvoiceDate Format="CCYYMMDD">FILL_IN</InvoiceDate>'+
'    <RowsTotalVatExcludedAmount AmountCurrencyIdentifier="EUR">80,00</RowsTotalVatExcludedAmount>'+
'    <InvoiceTotalVatExcludedAmount AmountCurrencyIdentifier="EUR">80,00</InvoiceTotalVatExcludedAmount>'+
'    <InvoiceTotalVatAmount AmountCurrencyIdentifier="EUR">19,20</InvoiceTotalVatAmount>'+
'    <InvoiceTotalVatIncludedAmount AmountCurrencyIdentifier="EUR">99,20</InvoiceTotalVatIncludedAmount>'+
'    <VatSpecificationDetails>'+
'      <VatBaseAmount AmountCurrencyIdentifier="EUR">80,00</VatBaseAmount>'+
'      <VatRatePercent>24,00</VatRatePercent>'+
'      <VatCode>S</VatCode>'+
'      <VatRateAmount AmountCurrencyIdentifier="EUR">19,20</VatRateAmount>'+
'    </VatSpecificationDetails>'+
'    <PaymentTermsDetails>'+
'      <InvoiceDueDate Format="CCYYMMDD">20220130</InvoiceDueDate>'+
'      <PaymentOverDueFineDetails>'+
'        <PaymentOverDueFineFreeText>Viiv�styskorko</PaymentOverDueFineFreeText>'+
'        <PaymentOverDueFinePercent>7,5</PaymentOverDueFinePercent>'+
'      </PaymentOverDueFineDetails>'+
'    </PaymentTermsDetails>'+
'  </InvoiceDetails>'+
'  <InvoiceRow>'+
'    <ArticleIdentifier>0000</ArticleIdentifier>'+
'    <ArticleName>Placeholder 1</ArticleName>'+
'    <InvoicedQuantity QuantityUnitCode="kpl" QuantityUnitCodeUN="C62">200</InvoicedQuantity>'+
'	   <UnitPriceAmount AmountCurrencyIdentifier="EUR">0,20</UnitPriceAmount>'+
'    <RowPositionIdentifier>1</RowPositionIdentifier>'+
'    <RowVatRatePercent>24,00</RowVatRatePercent>'+
'    <RowVatCode>S</RowVatCode>'+
'    <RowVatExcludedAmount AmountCurrencyIdentifier="EUR">40,00</RowVatExcludedAmount>'+
'  </InvoiceRow>'+
'    <InvoiceRow>'+
'    <ArticleIdentifier>0001</ArticleIdentifier>'+
'    <ArticleName>Placeholder 2</ArticleName>'+
'    <InvoicedQuantity QuantityUnitCode="kpl" QuantityUnitCodeUN="C62">200</InvoicedQuantity>'+
'    <UnitPriceAmount AmountCurrencyIdentifier="EUR">0,20</UnitPriceAmount>'+
'    <RowPositionIdentifier>2</RowPositionIdentifier>'+
'    <RowVatRatePercent>24,00</RowVatRatePercent>'+
'    <RowVatCode>S</RowVatCode>'+
'    <RowVatExcludedAmount AmountCurrencyIdentifier="EUR">40,00</RowVatExcludedAmount>'+
'  </InvoiceRow>'+
'</Finvoice >'

export default function makeXML(dataToInsert) {
    const modifyXML = convert.xml2js(xmlFile, {compact: true, spaces: 4});
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth()+1, 1)
    const baseRow = JSON.parse(JSON.stringify(modifyXML.Finvoice.InvoiceRow[0]))
    var row = 1
    var noVAT = 0.0
    for(let field in dataToInsert){
      const newField = JSON.parse(JSON.stringify(baseRow))
      const item = dataToInsert[field]
      newField.ArticleName._text = item.FI
      newField.ArticleIdentifier._text = item.CODE
      newField.InvoicedQuantity._text = item.ORDER
      newField.RowPositionIdentifier = row
      row += 1
      const price = Math.round((Number(item.ORDER)*Number(item.PRICE) + Number.EPSILON) * 100) / 100
      noVAT += price
      newField.RowVatExcludedAmount._text = String(price)
      modifyXML.Finvoice.InvoiceRow.push(newField)
    }
    modifyXML.Finvoice.InvoiceRow = modifyXML.Finvoice.InvoiceRow.filter((obj) => !obj.ArticleName._text.includes('Placeholder'))
    const VAT = String(noVAT*0.24)
    const finalPrice = String(noVAT*1.24)
    noVAT = String(noVAT)
    const invoiceDetails = modifyXML.Finvoice.InvoiceDetails
    invoiceDetails.InvoiceTotalVatExcludedAmount._text = noVAT
    invoiceDetails.InvoiceTotalVatIncludedAmount._text = finalPrice
    invoiceDetails.RowsTotalVatExcludedAmount._text = noVAT
    invoiceDetails.VatSpecificationDetails.VatBaseAmount._text = noVAT
    invoiceDetails.VatSpecificationDetails.VatRateAmount._text = VAT
    invoiceDetails.InvoiceTotalVatAmount._text = VAT
    invoiceDetails.InvoiceDate._text = today.getFullYear()+('0'+today.getMonth()+1).slice(-2)+('0' + today.getDate()).slice(-2)
    const nm = nextMonth.getMonth()+1
    invoiceDetails.PaymentTermsDetails.InvoiceDueDate._text = nextMonth.getFullYear()+('0' + nm).slice(-2)+'15'
    modifyXML.Finvoice.DeliveryDetails.DeliveryDate._text = today.getFullYear()+('0'+today.getMonth()+1).slice(-2)+('0' + today.getDate()).slice(-2)
    modifyXML.Finvoice.BuyerPartyDetails.BuyerPostalAddressDetails.BuyerPostCodeIdentifier._text = '02150'
    const result = convert.js2xml(modifyXML, {compact: true, spaces: 4})
    console.log(result)
}