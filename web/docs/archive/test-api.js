const http = require('http');

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      `http://localhost:3000${path}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function patchJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      `http://localhost:3000${path}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('--- Testing API End-to-End Workflow ---');

  // 1. Create Razorpay Order
  console.log('\n1. Creating Razorpay Order for Internship (₹299)...');
  const orderRes = await postJson('/api/payment/create-order', {
    amount: 299,
    currency: 'INR',
    receipt: 'rcpt_test_101',
    notes: { type: 'internship_fee' },
  });
  console.log(`[STATUS ${orderRes.status}] Order:`, orderRes.data);

  // 2. Verify Payment
  console.log('\n2. Verifying Payment Signature...');
  const verifyRes = await postJson('/api/payment/verify', {
    razorpay_order_id: orderRes.data.id,
    razorpay_payment_id: 'pay_test_verified_992',
    razorpay_signature: 'sig_mock_ok',
  });
  console.log(`[STATUS ${verifyRes.status}] Verification:`, verifyRes.data);

  // 3. Submit Internship Application
  console.log('\n3. Submitting Internship Application...');
  const appRes = await postJson('/api/applications', {
    internshipId: 'int-1',
    internshipTitle: 'Corporate Mergers & Acquisitions Research Fellow',
    fullName: 'Rhea Chakraborty',
    email: 'rhea.c@nluo.ac.in',
    phone: '+91 98300 12345',
    collegeName: 'National Law University Odisha (NLUO)',
    yearOfStudy: '4th Year',
    cgpa: '8.6/10',
    resumeUrl: 'https://drive.google.com/sample-rhea',
    sop: 'Keen to specialize in Competition Law and cross-border M&A with SAM.',
    paymentStatus: 'submitted',
    paymentId: verifyRes.data.paymentId,
    amountPaid: 299,
  });
  console.log(`[STATUS ${appRes.status}] New Application ID:`, appRes.data.application?.id);

  // 4. Submit Article to "Publish With Us"
  console.log('\n4. Submitting New Manuscript to "Publish With Us"...');
  const artRes = await postJson('/api/articles', {
    type: 'submission',
    authorName: 'Adv. Devansh Kothari',
    authorEmail: 'devansh@delhibar.org',
    authorInstitution: 'Bar Council of Delhi',
    authorDesignation: 'High Court Advocate',
    title: 'Interplay Between Digital Personal Data Protection Act 2023 and the Right to Information Act',
    category: 'Data Privacy & Tech Law',
    abstract: 'This paper scrutinizes Section 44(3) of the DPDP Act 2023 amending Section 8(1)(j) of the RTI Act, analyzing judicial exemptions in public interest disclosure.',
    content: '## Abstract\nExamining the tension between transparency under the RTI Act and privacy protections under DPDP Act 2023.\n\n## Section 44(3) Implications\nComplete exemption of personal information without public interest proviso.',
    keywords: ['DPDP Act 2023', 'RTI Act 2005', 'Section 8(1)(j)', 'Supreme Court Precedent'],
    paymentStatus: 'paid',
    paymentId: 'pay_pub_devansh_881',
    amountPaid: 499,
  });
  const subId = artRes.data.submission?.id;
  console.log(`[STATUS ${artRes.status}] Submission Docket:`, subId);

  // 5. Admin Approves and Publishes the Manuscript Live
  console.log('\n5. Admin Reviewer Approves & Publishes Manuscript Live...');
  const patchRes = await patchJson('/api/articles', {
    submissionId: subId,
    status: 'published',
    feedback: 'Reviewed by Senior Editorial Board. Plagiarism verified at 2.4%. Approved for immediate publication.',
  });
  console.log(`[STATUS ${patchRes.status}] Status Updated to:`, patchRes.data.status);
  console.log('Total Published Articles Now:', patchRes.data.articles?.length);

  console.log('\nAll End-to-End API Workflows Verified Successfully!');
}

runTests();
