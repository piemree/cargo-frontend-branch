import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import request from 'src/request';

const GiveCargoToCustomer = () => {
  const [tc, setTc] = useState('');
  const [cargos, setCargos] = useState([]);

  const giveCargo = async (cargoId) => {
    //create confirmation
    const cnfrm = confirm('Kargoyu teslim etmek istediğinize emin misiniz?');
    if (!cnfrm) return;
    try {
      const result = await request.post('/cargo/GiveCargoToCustomer', {
        cargoId,
      });
      if (result.data.success) {
        alert('Kargo başarıyla teslim edildi');
        getUserCargos();
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
    }
  };
  const getUserCargos = async () => {
    try {
      const result = await request.get('/branch/getMyBranchCargosByTc/' + tc);
      if (result.data.success) {
        setCargos(result.data.data);
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className="mb-4">Kargo Teslim Et</h1>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Tc Kimlik No"
                      valid={tc.length === 11}
                      value={tc}
                      onChange={(e) =>
                        setTc(e.target.value.length <= 11 && e.target.value)
                      }
                    />
                    <CButton
                      onClick={getUserCargos}
                      type="button"
                      color="secondary"
                      variant="outline"
                    >
                      Şubede Ara
                    </CButton>
                  </CInputGroup>
                  <CTable
                    align="middle"
                    className="mb-0 border"
                    hover
                    responsive
                    bordered
                  >
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Gönderici</CTableHeaderCell>
                        <CTableHeaderCell>Alıcı</CTableHeaderCell>
                        <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                        <CTableHeaderCell>Durum</CTableHeaderCell>
                        <CTableHeaderCell>Toplam Fiyat</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {cargos?.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <div>
                              {item?.sender?.name} {item?.sender?.surname}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item?.receiver?.name} {item?.receiver?.surname}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.content}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.status}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.totalPrice} TL</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              onClick={() => giveCargo(item._id)}
                              type="button"
                              color="secondary"
                              variant="outline"
                            >
                              Teslim Et
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default GiveCargoToCustomer;
