import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import request from 'src/request';

const GiveCargosToVehicle = () => {
  const [state, setState] = useState({
    vehicleId: '',
    cargoIds: [],
  });

  const [vehicleList, setVehicleList] = useState([]);
  const [cargoList, setCargoList] = useState([]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.vehicleId === '') {
        alert('Lütfen araç seçiniz');
        return;
      }
      if (state.cargoIds.length === 0) {
        alert('Lütfen kargo seçiniz');
        return;
      }
      const result = await request.post('/cargo/giveCargosToVehicle', state);
      if (result.data.success) {
        alert('Karogalar başarıyla eklendi');
        setState({
          vehicleId: '',
          cargoIds: [],
        });
        request
          .get('/branch/getMyBranchCargos')
          .then((response) => {
            setCargoList(response.data.data);
          })
          .catch(console.log);
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    request
      .get('/branch/getMyBranchCargos')
      .then((response) => {
        setCargoList(response.data.data);
      })
      .catch(console.log);
    request
      .get('/vehicle/getAvailableVehicles')
      .then((response) => {
        setVehicleList(response.data.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} lg={9} xl={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h3>Araca Kargo Yükle</h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={onFormSubmit}>
                  <h5>Aracınızı Seçiniz</h5>

                  <CInputGroup className="mb-3">
                    <CFormSelect
                      onChange={(e) =>
                        setState({ ...state, vehicleId: e.target.value })
                      }
                      value={state.vehicleId}
                    >
                      <option value={null}>Lütfen aracınızı seçiniz</option>
                      {vehicleList?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.licensePlate}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <h5>Eklenecek Kargolar</h5>
                  <CTable
                    align="middle"
                    className="mb-3 border"
                    hover
                    responsive
                  >
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>
                          <CFormCheck
                            type="checkbox"
                            id="flexCheckDefault"
                            label=""
                            checked={state.cargoIds.length === cargoList.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setState({
                                  ...state,
                                  cargoIds: cargoList.map(
                                    (item) => item._id
                                  ),
                                });
                              } else {
                                setState({
                                  ...state,
                                  cargoIds: [],
                                });
                              }
                            }}
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell>İçerik</CTableHeaderCell>
                        <CTableHeaderCell>Hedef Şube</CTableHeaderCell>
                        <CTableHeaderCell>Durum</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {cargoList.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <CFormCheck
                              type="checkbox"
                              id="flexCheckDefault"
                              label=""
                              checked={state.cargoIds.includes(item._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setState({
                                    ...state,
                                    cargoIds: [...state.cargoIds, item._id],
                                  });
                                } else {
                                  setState({
                                    ...state,
                                    cargoIds: state.cargoIds.filter(
                                      (id) => id !== item._id
                                    ),
                                  });
                                }
                              }}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.content}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {item?.targetBranch?.name}
                          </CTableDataCell>
                          <CTableDataCell>{item?.status}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Ekle
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default GiveCargosToVehicle;
