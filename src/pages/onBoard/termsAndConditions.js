import React, {Component} from 'react';
import {SafeAreaView, View, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Colors from '../../helpers/colors';
import {ToastShort} from '../../helpers/utils';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component {
  state = {
    accepted: false,
  };

  acceptTerms = () => {
    ToastShort('Terms Accepted');
    setTimeout(() => {
      this.props.navigation.navigate('OnboardFour');
    }, 500);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Terms and conditions</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                accepted: true,
              });
            }
          }}>
          <Text style={styles.tcP}>
            This End User License Agreement, including any supplemental terms (collectively, the “EULA”) is between You and Herconomy and
            governs your use of the Herconomy Software (the “Software”).
          </Text>
          <Text style={styles.topic}>Delivery and Acceptance </Text>
          <Text style={styles.tcP}>
            The Software is deemed to be delivered and accepted by You on the earlier of the date it is made available for download or
            installation or the date that Herconomy ships the tangible media (e.g. CD or DVD) containing the Software. You agree to be bound
            by the terms of this EULA from the acceptance date. If You do not have the authority to enter into this EULA or You do not agree
            with its terms, do not use the Software. Return it to the Approved Source, disable or uninstall it and request a full refund
            within thirty (30) days of the date of Your initial purchase. Your right to return and refund applies only if You are the
            original end user licensee of the Software.
          </Text>
          <Text style={styles.topic}>License</Text>

          <Text style={styles.tcP}>
            Subject to Your purchase of a license to the Software from an Approved Source and compliance with this EULA, Herconomy grants
            You a non-exclusive and non-transferable license to use the Software and related Documentation for Your internal use in
            accordance with and for the term (if any) specified in any applicable Order, Entitlement and supplemental terms. If Your use of
            the Software exceeds Your Entitlement, You will pay for Your excess use as required.
          </Text>
          <Text style={styles.topic}>Ownership</Text>
          <Text style={styles.tcP}>
            Herconomy retains ownership in all intellectual property rights in and to the Software and all underlying technology and
            associated Documentation related thereto. You authorize Herconomy to use any feedback and ideas You provide in connection with
            Your use of the Software for any purpose.
          </Text>
          <Text style={styles.topic}>Limitations and Restrictions</Text>
          <Text style={styles.tcP}>
            Unless expressly authorized by Herconomy in writing or otherwise permitted under applicable law, You will not:
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} sell, resell, transfer, sublicense, or assign Your rights under this license (except as expressly provided herein);
          </Text>
          <Text style={styles.tcL}>{'\u2022'} modify, adapt or create derivative works;</Text>
          <Text style={styles.tcL}>
            {'\u2022'} reverse engineer, decompile, decrypt, disassemble or otherwise attempt to derive the source code, except as provided
            in Section 17 below;
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} make the functionality available to third parties, whether as an application service provider, or on an outsourcing,
            membership or subscription, rental, service bureau, cloud service, managed or hosted service, or other similar basis; liable. It
            shall be your own responsibility to ensure that any products, services or information available through this website meet your
            specific requirements.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use the Software that is licensed for a specific device, whether physical or virtual, on another device;
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} remove, modify, or conceal any product identification, copyright, proprietary, intellectual property notices or other
            marks;
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use the Herconomy Content with third-party products or service offerings that Herconomy has not identified as
            compatible with the Software, extract Herconomy Content or provide Herconomy Content to a third party.
          </Text>
          <Text style={styles.topic}>Upgrades and Additional Copies</Text>

          <Text style={styles.tcP}>You may not use Upgrades or additional copies of the Software beyond Your Entitlement unless You:</Text>
          <Text style={styles.tcL}>
            {'\u2022'} have and comply with a valid license to the Software and have paid any fee applicable to the Upgrade or additional
            copies;
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} have a valid support agreement covering the Software (either as part of a subscription or purchased separately) or
            purchase the Upgrades or copies separately, where You do not have a support agreement.
          </Text>
          <Text style={styles.topic}>Use by Authorized Users</Text>

          <Text style={styles.tcP}>
            You may allow Authorized Users to use the Software solely on Your behalf for Your internal operations. You are responsible for
            ensuring that Authorized Users comply with the terms of this EULA and You are liable for any breach of the same by such
            Authorized Users. If You have purchased the Software under a particular buying program, further restrictions may apply. To the
            extent permitted by applicable law, You must ensure that third parties using the Software on Your behalf bring all claims
            related to the Software to You and waive all claims directly against Herconomy related to those claims.
          </Text>
          <Text style={styles.topic}>Third-Party Products</Text>

          <Text style={styles.tcP}>
            If You use the Software in conjunction with third-party products, You are responsible for complying with the third-party
            providers’ terms and conditions and privacy policies, and all such use is at Your risk. Herconomy does not provide support or
            guarantee ongoing integration support for products that are not a native part of the Software.
          </Text>
          <Text style={styles.topic}>Limited Warranty and Disclaimer</Text>

          <Text style={styles.tcP}>
            a. Limited Warranty: Herconomy warrants that the Software will substantially conform to the applicable Documentation for the
            longer of: (i) ninety (90) days following the date the Software is made available to You for Your use. This warranty does not
            apply if the Software, product or any other equipment upon which the Software is authorized to be used: (i) has been altered,
            except by Herconomy or its authorized representative; (ii) has not been installed, operated, repaired, or maintained in
            accordance with instructions supplied by Herconomy; (iii) has been subjected to abnormal physical or electrical stress, abnormal
            environmental conditions, misuse, negligence, or accident; or (iv) has not been provided by an Approved Source. Herconomy will
            use commercially reasonable efforts to deliver to You Software free from any viruses, programs, or programming devices designed
            to modify, delete, damage or disable the Software or Your data.
          </Text>
          <Text style={styles.tcP}>
            b. Exclusive Remedy. Upon Your prompt written notification to the Approved Source during the warranty period of breach of this
            Section 8, to the extent permitted by applicable law, Your sole and exclusive remedy is, at our option, either: (i) repair or
            replacement of the Software; or (ii) a refund of the license fees paid for the non-conforming Software. The Approved Source may
            ask You to return or destroy the Software, and/or documentation as a condition of the Software remedy.
          </Text>
          <Text style={styles.tcP}>
            c. Disclaimer. If You are a customer who is a consumer (someone who uses the Software outside of Your trade, business or
            profession), You may have legal rights in Your country of residence that prohibit the following limitations from applying to
            You, and, where prohibited, they will not apply to You. To find out more about rights, contact a local consumer advice
            organization.
          </Text>
          <Text style={styles.tcP}>
            Except as expressly set forth above or agreed in writing by Herconomy, to the extent allowed by applicable law, Herconomy
            expressly disclaims all warranties and conditions of any kind, express or implied including without limitation, any warranty,
            conditions or other implied terms regarding merchantability or fitness for a particular purpose or non-infringement.
          </Text>
          <Text style={styles.topic}>Section 9. Community Standards </Text>
          <Text style={styles.topic}>Community Standards </Text>

          <Text style={styles.tcP}>
            a. Violence and Incitement: While we understand that people commonly express disdain or disagreement by threatening or calling
            for violence in non-serious ways, we remove language that incites or facilitates serious violence. We remove content, disable
            accounts and work with law enforcement when we believe that there is a genuine risk of physical harm or direct threats to public
            safety. We also try to consider the language and context in order to distinguish casual statements from content that constitutes
            a credible threat to public or personal safety. In determining whether a threat is credible, we may also consider additional
            information such as a person's public visibility and the risks to their physical safety.
          </Text>
          <Text style={styles.tcP}>
            b. Dangerous Individuals and Organisations: In an effort to prevent and disrupt real-world harm, we do not allow any
            organisations or individuals that proclaim a violent mission or are engaged in violence to have a presence on the Software. This
            includes organisations or individuals involved in the following:
          </Text>
          <Text style={styles.tcL}>{'\u2022'} Terrorist activity</Text>
          <Text style={styles.tcL}>{'\u2022'} Organised hate and crime</Text>
          <Text style={styles.tcL}>{'\u2022'} Mass murder (including attempts) or multiple murder</Text>
          <Text style={styles.tcL}>{'\u2022'} Human trafficking</Text>
          <Text style={styles.tcL}>{'\u2022'} Organised violence or criminal activity</Text>
          <Text style={styles.tcP}>
            We also remove content that expresses support or praise for groups, leaders or individuals involved in these activities.
          </Text>
          <Text style={styles.tcP}>
            c. Suicide and self-injury: In an effort to promote a safe environment on Herconomy, we remove content that encourages suicide
            or self-injury, including certain graphic imagery, real-time depictions and fictional content that experts tell us might lead
            others to engage in similar behaviour. Self-injury is defined as the intentional and direct injuring of the body, including
            self-mutilation and eating disorders.
          </Text>
          <Text style={styles.tcP}>
            d. Privacy Violations and Image rights: Privacy and the protection of personal information are fundamentally important values
            for Herconomy. We work hard to keep your account secure and safeguard your personal information in order to protect you from
            potential physical or financial harm.
          </Text>
          <Text style={styles.tcP}>
            e. Violent and Graphic Content: We remove content that glorifies violence or celebrates the suffering or humiliation of others
            because it may create an environment that discourages participation. We allow graphic content (with some limitations) to help
            people raise awareness about issues. We know that people value the ability to discuss important issues such as human rights
            abuses or acts of terrorism. We also know that people have different sensitivities with regard to graphic and violent content.
            For that reason, we add a warning label to especially graphic or violent content so that it is not available to people under the
            age of eighteen and so that people are aware of the graphic or violent nature before they click to see it.
          </Text>
          <Text style={styles.tcP}>
            f. Cybersecurity: We recognize that the safety of our users extends to the security of their personal information. Attempts to
            gather sensitive personal information by deceptive or invasive methods are harmful to the authentic, open, and safe atmosphere
            that we want to foster. Therefore, we do not allow attempts to gather sensitive user information through the abuse of our
            platform and products.
          </Text>
          <Text style={styles.topic}> Limitations and Exclusions of Liability </Text>
          <Text style={styles.tcP}>
            In no event will Herconomy be liable for the following, regardless of the theory of liability or whether relating to or arising
            out of this EULA, Your Order, the Software or otherwise, even if a party has been advised of the possibility of such damages:
            (i) indirect, incidental, exemplary, special or consequential damages; (ii) loss or corruption of data or interrupted or loss of
            business; or (iii) loss of revenue, profits, goodwill or anticipated sales or savings. All liability of Herconomy, its
            affiliates, officers, directors, employees, agents, and suppliers collectively, to You, whether based in warranty, contract,
            tort (including negligence), or otherwise, shall not exceed, in the aggregate, the total fees attributable to the twelve (12)
            month period before the initial claim and paid or payable by You to any Approved Source under the applicable Order. This
            limitation of liability for Software is cumulative and not per incident. Nothing in this EULA limits or excludes any liability
            that cannot be limited or excluded under applicable law.
          </Text>
          <Text style={styles.topic}> Audit </Text>
          <Text style={styles.tcP}>
            During the license term for the Software and for a period of one (1) year after its expiration or termination, You will take
            reasonable steps to maintain complete and accurate records of Your use of the Software sufficient to verify compliance with this
            EULA. No more than once per twelve (12) month period, You will allow Herconomy and its auditors the right to examine such
            records and any applicable books, systems (including licensor’s product(s) or other equipment), and accounts, upon reasonable
            advanced notice, during Your normal business hours. If the audit discloses underpayment of license fees, You or Your Approved
            Source will pay such fees plus the reasonable cost of the audit within thirty (30) days of receipt of written notice
          </Text>
          <Text style={styles.topic}> Term and Termination </Text>
          <Text style={styles.tcP}>
            a. Your license begins on the date the Software is shipped or made available for download or installation and continues until
            terminated or until the end of the term specified in the Order or Entitlement. This is also the start date of Your subscription,
            if the Software is licensed on a subscription basis.
          </Text>
          <Text style={styles.tcP}>
            b. Subscriptions will automatically renew for the renewal period selected on the Order (“Renewal Term”) unless: (i) You notify
            the Approved Source in writing at least thirty (30) days before the end of the then-current term of Your intention not to renew;
            or (ii) You or Your Approved Source elect on the Order at the time of initial purchase not to auto-renew the subscription. Your
            Approved Source will notify You reasonably in advance of any Renewal Term if there are fee changes. The new fees will apply for
            the upcoming Renewal Term unless You or Your Approved Source promptly notify (the licensor) in writing, before the applicable
            renewal date, that You do not accept the fee changes. In such event, the subscription will terminate at the end of the initial
            term.
          </Text>
          <Text style={styles.tcP}>
            c. If a party materially breaches this EULA and does not cure that breach within thirty (30) days after receipt of written
            notice of the breach, the non-breaching party may terminate this EULA for cause. Herconomy also has the right to immediately
            suspend or terminate Your use of the Software if You breach Sections 2, 5 or 15. Upon termination of the EULA, You must cease
            any further use of the Software, and destroy any copies of Software within Your control. Upon Your termination for Herconomy’s
            material breach of the EULA, if there are any outstanding subscriptions we will refund to You or Your Approved Source any
            prepaid fees covering the period from the effective date of termination to the end of the term. Upon the termination for Your
            material breach of the EULA, if there are any outstanding subscriptions You will pay the licensor or Your Approved Source any
            unpaid fees covering the period from the effective date of termination to the end of the term.
          </Text>
          <Text style={styles.topic}> Confidential Information and Data </Text>
          <Text style={styles.tcP}>
            a. Confidential Information. Recipient will hold in confidence and use no less than reasonable care to avoid disclosure of any
            Confidential Information to any third party, except for its employees, affiliates and contractors who have a need to know such
            information in connection with this EULA, and are under written confidentiality obligations no less restrictive than the terms
            set forth in this Section. Recipient will be liable for any breach of this Section by its employees, affiliates and contractors.
            Recipient’s nondisclosure obligation will not apply to information which: (i) is known by Recipient without confidentiality
            obligations; (ii) is or has become public knowledge through no fault of Recipient; or (iii) is independently developed by
            Recipient. Recipient may disclose Discloser’s Confidential Information if required pursuant to a regulation, law or court order;
            provided that, Recipient provides prior notice to Discloser (to the extent legally permissible) and reasonably cooperates, at
            Discloser’s expense, regarding protective actions pursued by Discloser. Upon reasonable request of Discloser, Recipient will
            either return, delete or destroy all Confidential Information of Discloser and certify the same.
          </Text>
          <Text style={styles.tcP}>
            b. How we Use Your Data. The Licensor processes and uses Personal Data and Customer Data to deliver, analyze, support and
            improve the Software and as otherwise permitted in this EULA, the licensor’s privacy statement and the applicable Privacy Data
            Sheets. The licensor will maintain appropriate administrative, physical and technical safeguards, which are designed to protect
            the security, confidentiality and integrity of Personal Data and Customer Data processed by the licensor. Licensor may share
            Personal Data and Customer Data with third-party service providers consistent with Licensor’s Privacy Statement in order to
            assist in providing and improving the Software as described in the applicable Privacy Data Sheets. Herconomy contracts only with
            third-party service providers that can provide the same level of data protection and information security that Herconomy
            provides.
          </Text>
          <Text style={styles.tcP}>
            c. International Data Transfers. Herconomy may process and store Customer Data and Personal Data in Nigeria or outside of the
            country where it was collected. You are responsible for providing any required notices to Authorized Users and obtaining all
            required consents from Authorized Users regarding the processing and transfer of Personal Data by the Software, including
            international transfers. Herconomy will only transfer Personal Data consistent with applicable law.
          </Text>
          <Text style={styles.topic}> Export </Text>
          <Text style={styles.tcP}>
            The Software, products, technology and services are subject to local export control laws and regulations. You and Herconomy each
            will comply with such laws and regulations governing use, export, re-export, and transfer of Software, products and technology
            and will obtain all required local authorizations, permits or licenses.
          </Text>
          <Text style={styles.topic}> Survival </Text>
          <Text style={styles.tcP}>
            Sections 4, 5, the warranty limitation in 8a, 8b, 8c, 11, 12, and 14-17 shall survive termination or expiration of this EULA.
          </Text>
          <Text style={styles.topic}> Interoperability </Text>
          <Text style={styles.tcP}>
            If required by applicable law, Herconomy will provide You with the interface information needed to achieve interoperability
            between the Software and another independently created program. Herconomy will provide this interface information at Your
            written request. You will keep this information in strict confidence and strictly follow any applicable terms and conditions
            upon which Herconomy makes such information available.
          </Text>
          <Text style={styles.topic}> Third-party Beneficiaries</Text>
          <Text style={styles.tcP}>
            This EULA does not grant any benefits to any third party unless it expressly states that it does. In particular, no person other
            than a party to the EULA can enforce or take the benefit of any of its terms under the Contracts.
          </Text>
          <Text style={styles.topic}> Governing Law and Venue</Text>
          <Text style={styles.tcP}>
            The EULA, and any disputes arising out of or related hereto, will be governed exclusively by the applicable governing law below,
            based on Your primary place of business and without regard to conflicts of laws rules or the United Nations Convention on the
            International Sale of Goods. The courts located in the applicable venue will have exclusive jurisdiction to adjudicate any
            dispute arising out of or relating to the EULA or its formation, interpretation or enforcement.
          </Text>
          <Text style={styles.topic}> AGS Partner Transactions </Text>
          <Text style={styles.tcP}>
            If You purchase Herconomy Software from an AGS Partner: (i) the terms of this EULA apply to Your use of the Software; and (ii)
            the terms of this EULA prevail over any inconsistent provisions in Your purchase order with the AGS Partner.
          </Text>
          <Text style={styles.topic}> Notification</Text>
          <Text style={styles.tcP}>
            We may provide You with notice via email, regular mail and/or postings on our website or any other website used with the
            Software.
          </Text>
          <Text style={styles.topic}> Force Majeure </Text>
          <Text style={styles.tcP}>
            Except for payment obligations, neither party will be responsible for failure of performance due to an event beyond the affected
            party’s reasonable control, including accidents, severe weather events, acts of God, actions of any government agency, pandemic,
            acts of terrorism, or the stability or availability of the Internet or portions thereof.
          </Text>
          <Text style={styles.topic}> Reservation of Rights </Text>
          <Text style={styles.tcP}>Failure to enforce any right under this EULA will not waive that right.</Text>
          <Text style={styles.topic}> Definitions </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Approved Source” means Herconomy or an AGS authorized reseller, distributor or systems integrator.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'}
            “Authorized User(s)” means the individuals You authorize to access the Software, including Your employees or third parties that
            access the Software solely on Your behalf for Your internal operations.
          </Text>
          <Text style={styles.tcL}>{'\u2022'} “AGS” “we,” “our” or “us” means Herconomy or its applicable affiliate(s). </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “AGS Content” means any AGS-provided content or data, including, but not limited to, geographic or domain
            information, rules, signatures, threat intelligence or other threat data feeds, suspicious URLs and IP address data feeds.{' '}
          </Text>
          <Text style={styles.tcL}>{'\u2022'} “AGS Partner” means a AGS authorized reseller, distributor or systems integrator. </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Cloud Service” means the AGS hosted software-as-a-service offering or other AGS cloud-enabled feature described in
            an Offer Description. A Cloud Service may include Software.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Confidential Information” means non-public proprietary information of the disclosing party (“Discloser”) obtained by
            the receiving party (“Recipient”) in connection with this EULA, which: (i) is conspicuously marked; or (ii) is information which
            by its nature should reasonably be considered confidential; or (iii) if verbally disclosed, is summarized in writing to the
            Recipient within 14 days.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Customer Data” means all information and data that You or an Authorized User provides or transfers to AGS or that
            the Software collects from You, Your Authorized User(s) or Your system(s), in connection with Your use of the Software,
            including but not limited to data related to those Authorized Users Customer Data does not include Telemetry Data.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Documentation” means the AGS user or technical manuals, training materials, specifications, privacy data sheets or
            other information applicable to the Software.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Entitlement” means the license detail; including license metric, duration, and quantity published on Herconomy’s
            platform.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Order” means an ordering document (including a web or other electronic form) that specifies the duration,
            type/product ID (PID) and quantity of Software to be provided and the associated fees (if relevant).{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Personal Data” means any information that can be used to identify an individual and may include name, address, email
            address, phone number, login information (account number and password), marketing preferences, social media account information,
            or payment card number.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Software” means the binary image of AGS computer programs (including Upgrades) which could be a downloadable file,
            delivered on physical media, pre-installed on the on-premise computer system, resident in ROM/Flash (system memory) or
            cloud-hosted, and purchased from an Approved Source.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Telemetry Data” means all information and data that the Software generates in connection with Your use, including
            but not limited to, network policy, log and configuration information; threat intelligence data, URLs, metadata or net flow
            data; origin and nature of malware; the types of software or applications installed on a network or an endpoint; information
            about the devices connected to a network; information generated by sensors, devices and machinery; information related to the
            usage, origin of use, traffic patterns or behavior of the users of a network or Software; and information relating to the
            existence of cookies, web beacons, and other similar applications.{' '}
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} “Upgrades” means all updates, upgrades, bug fixes, error corrections, enhancements and other modifications to the
            Software.{' '}
          </Text>
        </ScrollView>

        {this.state.accepted && (
          <TouchableOpacity
            disabled={!this.state.accepted}
            onPress={this.acceptTerms}
            style={this.state.accepted ? styles.button : styles.buttonDisabled}>
            <Text style={styles.buttonLabel}>Accept</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  topic: {
    marginTop: 10,

    fontSize: 12,
    fontWeight: 'bold',
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
};
export default TermsAndConditions;
