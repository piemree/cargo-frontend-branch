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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilPhone } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import request from 'src/request';
import { useGlobals } from 'src/hooks/useGlobals';

const CreateCargo = () => {
  const [state, setState] = useState({});
  const [branchList, setBranchList] = useState([]);
  const { getUser } = useGlobals();
  const user = getUser();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await request.post('/cargo/create', state);
      if (result.data.success) {
        alert('Kargo başarıyla oluşturuldu');
        //reser form
        setState({});
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    request
      .get('/branch/getAllBranches')
      .then((response) => {
        setBranchList(
          response.data?.data?.filter((item) => item._id !== user?.branch)
        );
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onFormSubmit}>
                  <h1 className="mb-4">Yeni Kargo</h1>
                  <CCard className="mb-4">
                    <CCardBody>
                      <h4 className="mb-4">Gönderici Bilgileri</h4>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Ad"
                          valid={state.sender?.name?.length > 0}
                          value={state.sender?.name}
                          onChange={(e) =>
                            setState({
                              ...state,
                              sender: { ...state.sender, name: e.target.value },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Soyad"
                          valid={state.sender?.surname?.length > 0}
                          value={state.sender?.surname}
                          onChange={(e) =>
                            setState({
                              ...state,
                              sender: {
                                ...state.sender,
                                surname: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Telefon"
                          valid={state.sender?.phone?.length === 10}
                          value={state.sender?.phone}
                          onChange={(e) =>
                            setState({
                              ...state,
                              sender: {
                                ...state.sender,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <CFormInput
                          placeholder="TC Kimlik No"
                          valid={state.sender?.tcNo?.length === 11}
                          value={state.sender?.tcNo}
                          onChange={(e) =>
                            setState({
                              ...state,
                              sender: {
                                ...state.sender,
                                tcNo: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                    </CCardBody>
                  </CCard>
                  <CCard className="mb-4">
                    <CCardBody>
                      <h4 className="mb-4">Alıcı Bilgileri</h4>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Ad"
                          valid={state.receiver?.name?.length > 0}
                          value={state.receiver?.name}
                          onChange={(e) =>
                            setState({
                              ...state,
                              receiver: {
                                ...state.receiver,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Soyad"
                          valid={state.receiver?.surname?.length > 0}
                          value={state.receiver?.surname}
                          onChange={(e) =>
                            setState({
                              ...state,
                              receiver: {
                                ...state.receiver,
                                surname: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Telefon"
                          valid={state.receiver?.phone?.length === 10}
                          value={state.receiver?.phone}
                          onChange={(e) =>
                            setState({
                              ...state,
                              receiver: {
                                ...state.receiver,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <CFormInput
                          placeholder="TC Kimlik No"
                          valid={state.receiver?.tcNo?.length === 11}
                          value={state.receiver?.tcNo}
                          onChange={(e) =>
                            setState({
                              ...state,
                              receiver: {
                                ...state.receiver,
                                tcNo: e.target.value,
                              },
                            })
                          }
                        />
                      </CInputGroup>
                    </CCardBody>
                  </CCard>
                  <CInputGroup className="mb-3">
                    <CFormSelect
                      onChange={(e) =>
                        setState({ ...state, targetBranch: e.target.value })
                      }
                    >
                      <option value={null}>Varış Şubesi Seçiniz</option>
                      {branchList.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Kargo İçeriği"
                      valid={state.content?.length > 0}
                      value={state.content}
                      onChange={(e) =>
                        setState({ ...state, content: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Toplam Fiyat"
                      type="number"
                      valid={state.totalPrice > 0}
                      value={state.totalPrice}
                      onChange={(e) =>
                        setState({ ...state, totalPrice: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Ağırlık"
                      type="number"
                      valid={state.weight > 0}
                      value={state.weight}
                      onChange={(e) =>
                        setState({ ...state, weight: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Yükseklik"
                      type="number"
                      valid={state.height > 0}
                      value={state.height}
                      onChange={(e) =>
                        setState({ ...state, height: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Uzunluk"
                      type="number"
                      valid={state.length > 0}
                      value={state.length}
                      onChange={(e) =>
                        setState({ ...state, length: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Genişlik"
                      type="number"
                      valid={state.width > 0}
                      value={state.width}
                      onChange={(e) =>
                        setState({ ...state, width: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Kargo Oluştur
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

export default CreateCargo;
