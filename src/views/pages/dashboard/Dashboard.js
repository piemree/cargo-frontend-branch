import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import request from 'src/request';
import { Link } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';

const Dashboard = () => {
  const [state, setState] = useState([]);
  const [deliveredCargos, setDeliveredCargos] = useState([]);

  const { getUser } = useGlobals();
  const user = getUser();

  useEffect(() => {
    request
      .get('/branch/getBranchById/' + user.branch)
      .then((response) => {
        setState(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
    request
      .get('/branch/getMyBranchDeliveredCargos')
      .then((response) => {
        setDeliveredCargos(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Kargolar</h5>
            </CCardHeader>
            <CCardBody className="p-4">
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
                    <CTableHeaderCell>Alıcı TC</CTableHeaderCell>
                    <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                    <CTableHeaderCell>Toplam Fiyat</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {state?.cargos?.map((item, index) => (
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
                        <div>{item?.receiver?.tcNo}</div>
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Beklenen Kargolar</h5>
            </CCardHeader>
            <CCardBody className="p-4">
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
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {state?.waitingCargos?.map((item, index) => (
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Teslim Edilen Kargolar</h5>
            </CCardHeader>
            <CCardBody className="p-4">
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
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {deliveredCargos?.map((item, index) => (
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
